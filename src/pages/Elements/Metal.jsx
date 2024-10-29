

const Metal = () => {
    return (
        <div
            className="min-h-screen font-sans relative overflow-hidden"
            style={{
                backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Blitzcrank_4.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >          {/* Hero Section */}
            <section className="relative py-20 px-4 bg-white bg-opacity-70">
                <div className="absolute inset-0 opacity-50"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Metal Element</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        The Metal element is associated with strength, resilience, and clarity. It represents structure and organization, making it essential for achieving goals. In Feng Shui, Metal is believed to promote focus and discipline, helping individuals cultivate a sense of purpose in their lives.
                    </p>
                </div>
            </section>

            {/* Detailed Information */}
            <section className="py-20 px-4 bg-white bg-opacity-70">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Characteristics of Metal</h2>
                    <p className="text-lg mb-4">
                        Metal symbolizes precision and efficiency. It is often linked to wealth and abundance. Those aligned with the Metal element are known for their leadership qualities, ability to make tough decisions, and their inclination towards logical thinking.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Feng Shui Applications:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>Incorporate metallic colors (white, gold, silver) in your space for better focus.</li>
                        <li>Use metal objects to enhance clarity and purpose in your life.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default Metal;
