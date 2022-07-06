import React, { useState } from "react"
import { Button, Input, InputRightElement, Text, Link, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { InputGroup } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import Ajv from "ajv"
import formats from "ajv-formats"

const ajv = new Ajv()
formats(ajv)

const schema = {
	type: "object",
	properties: {
		email: { type: "string", format: "email" },
		password: { type: "string", minLength: 1 },
	},
}

const validation = ajv.compile(schema)

export default function SignIn() {
	const [email, setEmail] = React.useState("")
	const handleChangeEmail = (event: any) => setEmail(event.target.value)

	const [loading, setLoading] = useState(false)

	const navigation = useNavigate()

	const [password, setPassword] = React.useState("")
	const handleChangePassword = (event: any) => setPassword(event.target.value)

	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)

	const handleSubmit = async (event: any) => {
		setLoading(true)
		event.preventDefault()

		if (!validation({ email, password })) {
			setLoading(false)
			return
		}
		try {
			fetch(`${process.env.REACT_APP_API_BASE}/auth/signin`, {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: { "Content-type": "application/json" },
			}).then((res) => {
				if (res.ok) {
					setLoading(false)
					navigation("/")
					return
				} else {
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
						Se connecter
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
									<Input
										pr="4.5rem"
										type={show ? "text" : "password"}
										placeholder="Enter password"
										value={password}
										onChange={handleChangePassword}
										color="black"
									/>
									<InputRightElement width="4.5rem">
										<Button h="1.75rem" size="sm" onClick={handleClick}>
											{show ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>
							</Box>

							<Box width={"100%"} display="flex" flexDirection={"column"}>
								<Button bgColor={"#4DCCBD"} textColor="white" type="submit" isLoading={loading}>
									Connexion
								</Button>
								<Box color={"black"} display="flex" experimental_spaceX={"1"}>
									<Text>Pas encore inscrit ?</Text>
									<Link color="#4DCCBD" textColor={"#4DCCBD"} href="/auth/signup">
										<Text color="#4DCCBD" textColor={"#4DCCBD"}>
											S'inscrire
										</Text>
									</Link>
								</Box>
							</Box>
						</FormControl>
					</form>
				</Box>
			</Box>
		</>
	)
}
