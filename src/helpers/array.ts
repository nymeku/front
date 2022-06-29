export const randomChoose = <T>(arr: T[]): T => {
    if (arr.length < 2) return arr[0]
    return arr[Math.round(Math.random() * (arr.length - 1))]
}

export const chunks = <T>(table: T[], size: number): T[][] => Array.from({ length: Math.ceil(table.length / size) }, (_, i) => table.slice(size * i, size * (i + 1)))
