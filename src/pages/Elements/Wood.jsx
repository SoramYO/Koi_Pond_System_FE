import ElementCard from "../../components/ElementCard";

const Wood = () => {
    return (
        <div
            className="min-h-screen font-sans relative overflow-hidden"
            style={{
                backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Maokai_0.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >     {/* Hero Section */}
            <section className="relative py-20 px-4 bg-white bg-opacity-70">
                <div className="absolute inset-0 opacity-50"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Wood Element</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        The Wood element embodies growth, creativity, and vitality. It is associated with spring, renewal, and new beginnings. In Feng Shui, Wood encourages expansion and encourages individuals to pursue their passions.
                    </p>
                </div>
            </section>

            {/* Detailed Information */}
            <section className="py-20 px-4 bg-white bg-opacity-70">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Characteristics of Wood</h2>
                    <p className="text-lg mb-4">
                        Wood symbolizes flexibility and adaptability. Those aligned with the Wood element are typically nurturing and compassionate, showing strong interpersonal skills and the ability to foster collaboration.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Feng Shui Applications:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>Incorporate natural materials like wood in your environment to enhance growth and creativity.</li>
                        <li>Use green and brown colors to promote harmony and balance.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default Wood;
