import React, { FC, useState, memo } from "react"

import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import { useSignUpStyles } from "./styles"
import { useSignUp } from "./useSignUp"

// サインアップ用ページ
const SignUp: FC = memo(() => {
  const classes = useSignUpStyles()
  const { handleSubmit, isError } = useSignUp()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
//   const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="新規登録" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="名前"
              name="name"
              value= {name}
              margin="dense"
              onChange={event => setName(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
              name="email"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード"
              type="password"
              name="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="パスワード（確認用）"
              name="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <div className={classes.submitBtn}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!name || !email || !password || !passwordConfirmation ? true : false}
                // onClick={handleSubmit}
              >
                送信
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
      {/* <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレスかパスワードが間違っています"
      /> */}
      {
        isError && <div style={{color: 'red'}}>メールアドレスかパスワードが間違っています</div>
      }
    </>
  )
})

export default SignUp