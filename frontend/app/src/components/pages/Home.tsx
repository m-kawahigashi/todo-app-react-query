import React, { FC, useContext } from "react"

import { AuthContext } from "App"

const Home: FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <h1>こんにちは、 {currentUser?.name}さん！</h1>
            <h2>Email: {currentUser?.email}</h2>
            <h2>Name: {currentUser?.name}</h2>
          </>
        ) : (
          <h1>ログインできてないよー</h1>
        )
      }
    </>
  )
}

export default Home