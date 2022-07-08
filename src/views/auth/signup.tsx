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
	},
}

const validation = ajv.compile(schema)

export default function SignUp() {
	const navigation = useNavigate()

	const [loading, setLoading] = useState(false)

	const [email, setEmail] = React.useState("")
	const handleChangeEmail = (event: any) => setEmail(event.target.value)

	const [password, setPassword] = React.useState("")
	const handleChangePassword = (event: any) => setPassword(event.target.value)

	const [confirmPassword, setConfirmPassword] = React.useState("")
	const handleChangeConfirmPassword = (event: any) => setConfirmPassword(event.target.value)

	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)

	const [show2, setShow2] = React.useState(false)
	const handleClick2 = () => setShow2(!show2)

	const handleSubmit = async (event: any) => {
		setLoading(true)
		event.preventDefault()

		if (!validation({ email, password }) || password !== confirmPassword) {
			setLoading(false)
			return
		}
		try {
			await fetch(process.env.REACT_APP_API_BASE + "/auth/register", {
				method: "POST",
				body: JSON.stringify({ email: email, password: password }),
				headers: { "Content-type": "application/json", "Access-Control-Allow-Origin": "*" },
			}).then(async (res) => {
				if (res.ok) {
					const body = await res.json()
					localStorage.setItem("id", body.id)
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
						S'inscrire
					</Text>

					<form onSubmit={handleSubmit}>
						<FormControl experimental_spaceY={"10"}>
							<Box>
								<FormLabel htmlFor="email">Adresse email</FormLabel>
								<Input id="email" type="email" value={email} onChange={handleChangeEmail} />
							</Box>

							<Box>
								<FormLabel htmlFor="password">Mot de passe</FormLabel>
								<InputGroup size="md">
									<Input
										pr="4.5rem"
										type={show ? "text" : "password"}
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

							<Box>
								<FormLabel htmlFor="password">Confirmer mot de passe</FormLabel>
								<InputGroup size="md">
									<Input
										pr="4.5rem"
										type={show2 ? "text" : "password"}
										value={confirmPassword}
										onChange={handleChangeConfirmPassword}
										color="black"
									/>
									<InputRightElement width="4.5rem">
										<Button h="1.75rem" size="sm" onClick={handleClick2}>
											{show2 ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>
							</Box>

							<Box width={"100%"} display="flex" flexDirection={"column"}>
								<Button bgColor={"#4DCCBD"} textColor="white" type="submit" isLoading={loading}>
									S'inscrire
								</Button>
								<Box color={"black"} display="flex" experimental_spaceX={"1"}>
									<Text>Déjà membre ?</Text>
									<Link color="#4DCCBD" textColor={"#4DCCBD"} href="/auth/signin">
										<Text color="#4DCCBD" textColor={"#4DCCBD"}>
											Se connecter
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
