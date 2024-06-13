export type OpenAIResponse = {
    id: string
    object: string
    created: number
    model: string
    choices: Choice[]
    usage: Usage
    system_fingerprint: any
}

export type Choice ={
    index: number
    message: Message
    logprobs: any
    finish_reason: string
}

export type Message ={
    role: string
    content: string
}

export type Usage ={
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
}
