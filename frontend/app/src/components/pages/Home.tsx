import React, { FC, useContext } from "react"

import { AuthContext } from "App"

const Home: FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)

  if (isSignedIn && currentUser) {
    return <h1>ログインできてないよー</h1>
  }

  return (
    <>
      <h1>こんにちは、 {currentUser?.name}さん！</h1>
      <h2>Email: {currentUser?.email}</h2>
      <h2>Name: {currentUser?.name}</h2>
    </>
  )
}

export default Home