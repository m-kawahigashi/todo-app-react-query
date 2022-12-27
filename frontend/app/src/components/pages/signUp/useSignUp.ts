import { FormEvent, useState, useContext, useCallback } from "react"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"

import { AuthContext } from "App"
import { signUp } from "lib/api/auth"
import { SignUpParams } from "interfaces/index"


export const useSignUp = () => {
    const histroy = useHistory()

    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

    const [ isError, setIsError ] = useState<boolean>(false)
    // const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formElement = e.target as typeof e.target & {
        name: {value: string};
        email: {value: string};
        password: {value: string};
        passwordConfirmation: {value: string};
      }

      const name: SignUpParams["name"] = formElement.name.value;
      const email: SignUpParams["email"] = formElement.email.value;
      const password: SignUpParams["password"] = formElement.password.value;
      const passwordConfirmation: SignUpParams["passwordConfirmation"] = formElement.passwordConfirmation.value;

      const params: SignUpParams = {
        name: name,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation
      }

      try {
        const res = await signUp(params)
        console.log(res)

        if (res.status === 200) {
          // アカウント作成と同時にログインさせてしまう
          Cookies.set("_access_token", res.headers["access-token"] || "")
          Cookies.set("_client", res.headers["client"] || "")
          Cookies.set("_uid", res.headers["uid"] || "")

          setIsSignedIn(true)
          setCurrentUser(res.data.data)

          histroy.push("/")

          console.log("Signed in successfully!")
        } else {
        //   setAlertMessageOpen(true)
        }
      } catch (err) {
        console.log(err)
        // setAlertMessageOpen(true)
        setIsError(true)
      }
    },[  histroy, setCurrentUser, setIsSignedIn ])

    return { handleSubmit, isError }
}