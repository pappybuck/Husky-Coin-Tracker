/// <reference types="astro/client" />


declare namespace App {
    type Client = import ('pocketbase').default

    interface Locals {
        pb : Client
    }
}