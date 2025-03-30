export async function POST(req) {
    try {
        const { messages } = await req.json();
        console.log(messages);

        // Send the input text to Flask server
        const flaskResponse = await fetch("http://10.1.18.133:5000/receive", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages }),
        });

        const flaskData = await flaskResponse.json();
        console.log("Response from Flask:", flaskData);

        if (!flaskResponse.ok) {
            console.error("Flask server error:", flaskData);
            return new Response(JSON.stringify({ error: "Flask server returned an error" }), { status: flaskResponse.status });
        }

        return new Response(JSON.stringify(flaskData), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: "Failed to send request to Flask server" }), { status: 500 });
    }
}
