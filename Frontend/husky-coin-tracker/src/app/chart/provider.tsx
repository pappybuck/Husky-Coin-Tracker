"use client"

import cubejs from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import WebSocketTransport from "@cubejs-client/ws-transport";

const cubejsApi = cubejs({
    transport: new WebSocketTransport({
        authorization: 'token',
      apiUrl: "ws://localhost:4000/",
    }),
  });

export default function Provider( {children} : {children: React.ReactNode} ) {
    return (
        <CubeProvider cubejsApi={cubejsApi}>
            <main>{children}</main>
        </CubeProvider>
    )
}