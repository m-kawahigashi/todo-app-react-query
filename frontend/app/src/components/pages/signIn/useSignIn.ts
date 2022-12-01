import {  useState, useContext, useCallback } from "react"
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"

import { AuthContext } from "App"
import { signIn } from "lib/api/auth"
import { SignInParams } from "interfaces/index"

type Props = {
  email: string;
  password: string;
}

export const useSignIn = () => {
  const history = useHistory()
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleSubmit = useCallback(async (props: Props) => {
    const { email, password } = props;

    const params: SignInParams = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(params)
      console.log(res)

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"] || "")
        Cookies.set("_client", res.headers["client"] || "")
        Cookies.set("_uid", res.headers["uid"] || "")

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        history.push("/")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }

  },[ history, setCurrentUser, setIsSignedIn]);

  return { handleSubmit, alertMessageOpen, setAlertMessageOpen}
}