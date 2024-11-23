module Tauri
  ( greet
  )
  where

import Promise (Promise)

foreign import greet :: String -> Promise String
