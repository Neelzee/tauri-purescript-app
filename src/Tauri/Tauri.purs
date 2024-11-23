module Tauri
  ( greet
  )
  where

import Promise (Promise)

foreign import greet :: Promise String
