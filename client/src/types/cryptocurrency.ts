import { NavigateFunction } from "react-router-dom"

type Social = {
    website: string[],
    twitter: string[],
    facebook: string[],
    explorer: string[],
    reddit: string[],
    technical_doc: string[],
    source_code: string[]
}

type Price = {
    price: number,
    volume_change_24h: number,
    percent_change_24h: number
}

export type CryptoToken = {
    id?: number,
    name: string,
    symbol: string,
    description?: string,
    logo?: string,
    subreddit?: string,
    socials?: Social,
    statistics?: Price | any,
    push?: NavigateFunction,
    metadata?: any
}