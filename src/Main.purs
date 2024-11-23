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
import Web.HTML.HTMLDocument (toEventTarget, toParentNode)
import Web.HTML.Window (document)
import Web.HTML.HTMLInputElement as I

main :: Effect Unit
main = do
  w <- window
  doc <- document w
  let documentParent = toParentNode doc
  greetFormElementM <- querySelector (QuerySelector "#greet-form") documentParent
  greetInputElementM <- querySelector(QuerySelector "#greet-input") documentParent
  case (Tuple greetFormElementM (getInputElement greetInputElementM)) of
    Tuple (Just greetFormElement) (Just inputElement) -> do
      let greetFormNode = toNode greetFormElement
      let eventTarget = toEventTarget doc
      greetEvent <- eventListener (greetEffect greetFormNode)
      addEventListener (EventType "submit") greetEvent false eventTarget
      where
        greetEffect :: Node -> Event -> Effect Unit
        greetEffect greetFormNode evt = do
          _ <- preventDefault evt
          name <- I.value inputElement
          _ <- P.then_ (setGreeting greetFormNode) (greet name)
          mempty
        setGreeting :: Node -> String -> Effect (P.Promise Unit)
        setGreeting greetFormNode greeting = do
          _ <- setTextContent greeting greetFormNode
          pure (P.resolve unit)
    _ -> mempty

getInputElement :: Maybe Element -> Maybe I.HTMLInputElement
getInputElement (Just no) = I.fromElement no
getInputElement _ = Nothing