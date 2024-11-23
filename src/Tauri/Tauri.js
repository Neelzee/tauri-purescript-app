"use strict"
import { invoke } from "@tauri-apps/api/core";

export const greet = async (name) => invoke("greet", { name });
