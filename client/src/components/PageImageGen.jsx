import React, { useState } from 'react';

const PageImageGen = () => {
    const [prompt, setPrompt] = useState('');
    const [size, setSize] = useState('medium');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (prompt === '') {
            alert('Please add some text');
            return;
        }

        setLoading(true);
        setMessage('');
        setImageUrl('');

        try {
            const response = await fetch('/openai/generateimage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    size,
                }),
            });

            if (!response.ok) {
                throw new Error('That image could not be generated');
            }

            const data = await response.json();
            console.log(data);
            setImageUrl(data.data);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <header>
                <div className="navbar">
                    <div className="logo">
                        <h2>OpenAI Image Generator</h2>
                    </div>
                    <div className="nav-links">
                        <ul>
                            <li>
                                <a href="https://beta.openai.com/docs" target="_blank" rel="noopener noreferrer">
                                    OpenAI API Docs
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <main>
                <section className="showcase">
                    <form id="image-form" onSubmit={handleSubmit}>
                        <h1>Descreva uma Imagem</h1>
                        <div className="form-control">
                            <input
                                type="text"
                                id="prompt"
                                placeholder="Digite o texto"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <select
                                name="size"
                                id="size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                <option value="small">Pequeno</option>
                                <option value="medium">Médio</option>
                                <option value="large">Grande</option>
                            </select>
                        </div>
                        <button type="submit" className="btn">Gerar</button>
                    </form>

                    {loading ? (
                        <div className="loading">
                            <p>Loading...</p>
                        </div>
                    ) : (


                        imageUrl && (
                            <div className="image-container">
                                <img src={imageUrl} alt="" />
                                <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                                    <button className="download-button">Abrir em Nova Aba</button>
                                </a>
                            </div>
                        )
                    )}
                </section>
            </main>

        </div>
    )
}
export default PageImageGen;