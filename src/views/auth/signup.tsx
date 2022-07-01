import React, { useState } from "react"
import { Button, Input, InputRightElement, Text, Link, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { InputGroup } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import Ajv from "ajv"
import formats from "ajv-formats"
import { API_URL } from "../../constantes"

const ajv = new Ajv({
	allErrors: true,
    $data: true,
})
formats(ajv)

const schema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 8 },
		confirmPassword: { const: { "$data": "1/password"}, type: "string"}
    },
}

const validation = ajv.compile(schema)

export default function SignUp() {
    const [email, setEmail] = React.useState("")
    const handleChangeEmail = (event: any) => setEmail(event.target.value)

    const [loading, setLoading] = useState(false)

    const navigation = useNavigate()

    const [password, setPassword] = React.useState("")
    const handleChangePassword = (event: any) => setPassword(event.target.value)

	const [confirmPassword, setConfirmPassword] = React.useState("")
    const handleChangeConfirmPassword = (event: any) => setConfirmPassword(event.target.value)

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const handleSubmit = async (event: any) => {
        setLoading(true)
        event.preventDefault()

        if (!validation({ email, password, confirmPassword })) {
            setLoading(false)
            return
        }
        try {
			console.log("requete")
			console.log(API_URL)
			console.log(JSON.stringify({ "email": email, "password": password }))
            fetch(API_URL+"/auth/register", {
                method: "POST",
				body: "est",
                // body: JSON.stringify({ email: email, password: password }),
                headers: { "Access-Control-Allow-Origin": "*" },
            }).then((res) => {
                if (res.ok) {
					console.log("SUCCESSFULLY CREATED")
                    setLoading(false)
                    navigation("/")
                    return
                } else {
					console.log("FAILED TO CREATE")
                    setLoading(false)
                    return
                }
            })
        } catch (error) {
            setLoading(false)
            return
        }
    }

    return (
        <>
            <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" bg={"#f2f2f2"}>
                <Box
                    w={[300, 400, 500]}
                    p={4}
                    color="white"
                    display={"flex"}
                    flexDirection="column"
                    experimental_spaceY={"10"}
                    borderWidth={"1px"}
                    borderRadius="md"
                    bg={"white"}
                    padding={10}
                    textColor="black"
                >
                    <Text fontSize={"2xl"} fontWeight="semibold" align="center">
                        S'inscrire
                    </Text>

                    <form onSubmit={handleSubmit}>
                        <FormControl experimental_spaceY={"4"}>
                            <Box>
                                <FormLabel htmlFor="email">Email address</FormLabel>
                                <Input id="email" type="email" value={email} onChange={handleChangeEmail} />
                            </Box>

                            <Box>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup size="md">
                                    <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="Enter password" value={password} onChange={handleChangePassword} color="black" />
                                </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup size="md">
                                    <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={handleChangeConfirmPassword} color="black" />
                                </InputGroup>
                            </Box>

                            <Box width={"100%"} display="flex" flexDirection={"column"}>
                                <Button bgColor={"#4DCCBD"} textColor="white" type="submit" isLoading={loading}>
                                    Connexion
                                </Button>
                                
                            </Box>
                        </FormControl>
                    </form>
                </Box>
            </Box>
        </>
    )
}
