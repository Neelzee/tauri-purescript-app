module Main
  ( main
  )
  where

import Prelude

import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Effect (Effect)
import Promise as P
import Tauri (greet)
import Web.DOM.Element (toNode, Element)
import Web.DOM.Node (Node, setTextContent)
import Web.DOM.ParentNode (QuerySelector(..), querySelector)
import Web.Event.Event (Event, EventType(..), preventDefault)
import Web.Event.EventTarget (addEventListener, eventListener)
import Web.HTML (window)
import Web.HTML.HTMLDocument (fromParentNode, toEventTarget, toParentNode)
import Web.HTML.Window (document)
import Web.HTML.HTMLInputElement as I
import Effect.Class.Console (log)

main :: Effect Unit
main = do
  w <- window
  doc <- document w
  let eventType = EventType "submit"
  let parent = toParentNode doc
  node' <- querySelector (QuerySelector "#greet-form") parent
  edon <- (querySelector(QuerySelector "#greet-input") parent)
  case (Tuple node' (Tuple (fromParentNode parent) (getInputElement edon))) of
    (Tuple (Just n') (Tuple (Just parentNode) (Just inptNode))) -> do
      let node = toNode n'
      let eventTarget = toEventTarget parentNode
      eventListener_ <- eventListener (greetEffect inptNode node)
      addEventListener eventType eventListener_ false eventTarget
      where
        greetEffect :: I.HTMLInputElement -> Node -> Event -> Effect Unit
        greetEffect iNode n evt = do
          _ <- preventDefault evt
          name <- I.value iNode
          _ <- P.then_ (greetEffect' n) (greet name)
          mempty
        greetEffect' :: Node -> String -> Effect (P.Promise Unit)
        greetEffect' n name' = do
          _ <- log name'
          _ <- setTextContent name' n
          pure (P.resolve unit)
    _ -> mempty


getInputElement :: Maybe Element -> Maybe I.HTMLInputElement
getInputElement (Just no) = I.fromElement no
getInputElement _ = Nothing