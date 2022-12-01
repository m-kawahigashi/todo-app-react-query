import { FC,  memo, FormEvent, useState } from "react"
import { Link } from "react-router-dom"

import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"

import { useStyles } from "./styles";
import { useSignIn } from "./useSignIn";
import AlertMessage from "components/utils/AlertMessage"

// サインイン画面
const SignIn: FC = memo(() => {

  const classes = useStyles()
  const { handleSubmit , alertMessageOpen, setAlertMessageOpen} = useSignIn();
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const onSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmit({email, password});
  }

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={onSubmitLogin}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="ログイン" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="メールアドレス"
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
              placeholder="6文字以上"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <Box className={classes.submitBtn} >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!email || !password ? true : false}
              >
                送信
              </Button>
            </Box>
            <Box textAlign="center" className={classes.box}>
              <Typography variant="body2">
                まだアカウントをお持ちでない方は
                <Link to="/signup" className={classes.link}>
                  こちら
                </Link>
                 から作成してください。
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>

      {/* エラーが発生した場合はアラートを表示 */}
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレスかパスワードが間違っています"
      />
    </>
  )
})

export default SignIn