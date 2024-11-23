module Main
  ( main
  , greet'
  )
  where

import Prelude

import Data.Maybe (Maybe(..))
import Data.Monoid (mempty)
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Effect.Console (log)
import Promise as P
import Tauri (greet)
import Web.DOM.Element (toNode)
import Web.DOM.Node (Node, setTextContent)
import Web.DOM.ParentNode (QuerySelector(..), querySelector)
import Web.Event.CustomEvent (new, toEvent)
import Web.Event.Event (Event, EventType(..))
import Web.Event.EventTarget (addEventListener, eventListener)
import Web.HTML (window)
import Web.HTML.HTMLDocument (fromParentNode, toEventTarget, toParentNode)
import Web.HTML.Window (document)

main :: Effect Unit
main = do
  w <- window
  doc <- document w
  let eventType = EventType "submit"
  let parent = toParentNode doc
  node' <- querySelector (QuerySelector "#greet-form") parent
  case (Tuple node' (fromParentNode parent)) of
    (Tuple (Just n') (Just parentNode)) -> do
      let node = toNode n'
      let eventTarget = toEventTarget parentNode
      eventListener_ <- eventListener (greetEffect node)
      addEventListener eventType eventListener_ true eventTarget
      where
        greetEffect :: Node -> Event -> Effect Unit
        greetEffect n _ = do
          _ <- P.then_ (greetEffect' n) greet'
          mempty
        greetEffect' :: Node -> String -> Effect (P.Promise Unit)
        greetEffect' n name = do
          _ <- setTextContent name n
          pure (P.resolve unit)
    _ -> mempty


greet' :: P.Promise String
greet' = greet