import React from "react"
import { Button, Input, InputRightElement, Text, Link } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { InputGroup } from "@chakra-ui/react"

export default function SignUp() {
	const [value, setValue] = React.useState("")
	const handleChange = (event: any) => setValue(event.target.value)

	const [password, setPassword] = React.useState("")
	const handleChangePassword = (event: any) => setPassword(event.target.value)

	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)
	return (
		<>
			<Box
				width="100vw"
				height="100vh"
				display="flex"
				justifyContent="center"
				alignItems="center"
				bg={"#f2f2f2"}
			>
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
				>
					<Input
						value={value}
						onChange={handleChange}
						placeholder="example@test.com"
						size={"lg"}
						color="black"
					/>

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

					<Box width={"100%"} display="flex" flexDirection={"column"}>
						<Button colorScheme="blue">Connexion</Button>
						<Box fontSize="sm" display="flex" experimental_spaceX={"4"}>
							<Text color={"black"}>
								Pas encore inscrit ?{" "}
								<Link color="blue" textColor={"blue"} href="#">
									<Text color="blue" textColor={"blue"}>
										S'inscrire
									</Text>
								</Link>
							</Text>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	)
}
