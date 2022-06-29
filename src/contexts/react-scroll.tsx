type StopFunction = () => void
type OverrideScrollOption = {
    sampleSize: number
    scrollFactor: number
}
type dataPoint = { x: number; y: number }
type droite = { (x: number): number; a: number; b: number }

function linReg(data: dataPoint[]): droite {
    let x = data.reduce((a, b) => a + b.x, 0),
        y = data.reduce((a, b) => a + b.y, 0),
        x2 = data.reduce((a, b) => a + b.x ** 2, 0),
        xy = data.reduce((a, b) => a + b.x * b.y, 0),
        n = data.length,
        b = (y * x2 - x * xy) / (n * x2 - x ** 2),
        a = (n * xy - x * y) / (n * x2 - x ** 2)
    const d = (u: number) => a * u + b
    d.a = a
    d.b = b
    return d
}

function smoothing(data: dataPoint[], indicator: (data: dataPoint[]) => droite, sampleSize: number = 3): dataPoint[] {
    return data.map(({ x, y }, i) => {
        if (i < sampleSize - 1) return { x, y }
        var droite = indicator(data.slice(i - sampleSize + 1, i + 1))
        return { x, y: droite(x) }
    })
}

export default function overrideScroll(option?: OverrideScrollOption): StopFunction {
    const record: dataPoint[] = []
    let lastTimestamp = 0
    function onWheel(event: WheelEvent) {
        event.preventDefault()
        // console.log("scroll whell")
        if (record.length === option?.sampleSize || 5) record.shift()
        if (!lastTimestamp) lastTimestamp = event.timeStamp
        record.push({
            x: event.timeStamp - lastTimestamp,
            y: event.deltaY * (option?.scrollFactor || 1),
        })
        lastTimestamp = event.timeStamp
        requestAnimationFrame(() =>
            window.scrollBy({
                top: smoothing(record, linReg, option?.sampleSize || 5).at(-1)!.y,
            })
        )
    }
    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("scroll", (e) => e.preventDefault(), { passive: false })
    console.log("scroll overriden")
    return function stop() {
        console.log("back to normal scroll")
        window.removeEventListener("wheel", onWheel)
    }
}
