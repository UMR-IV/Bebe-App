import { Client } from "@gadget-client/tlbot";

export const api = new Client({ environment: window.gadgetConfig.environment });
