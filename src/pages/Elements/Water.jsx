import ElementCard from "../../components/ElementCard";

const Water = () => {
    return (
        <div
            className="min-h-screen font-sans relative overflow-hidden"
            style={{
                backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nami_0.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >        {/* Hero Section */}
            <section className="relative py-20 px-4 bg-white bg-opacity-70">
                <div className="absolute inset-0 opacity-50"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Water Element</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        The Water element symbolizes intuition, wisdom, and adaptability. It represents fluidity and the ability to flow through life's challenges. In Feng Shui, Water promotes communication and encourages the sharing of ideas and experiences.
                    </p>
                </div>
            </section>

            {/* Detailed Information */}
            <section className="py-20 px-4 bg-white bg-opacity-70">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Characteristics of Water</h2>
                    <p className="text-lg mb-4">
                        Water signifies depth, reflection, and emotional intelligence. Individuals aligned with the Water element are often introspective, empathetic, and capable of connecting deeply with others.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Feng Shui Applications:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>Incorporate flowing water features in your space to enhance tranquility and calmness.</li>
                        <li>Use blue and black colors to foster emotional balance and communication.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default Water;
