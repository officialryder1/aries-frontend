const url = "http://127.0.0.1:8000/api/characters"

export async function GET() {
    
    const res = await fetch(url)

    return new Response(res.body)
};