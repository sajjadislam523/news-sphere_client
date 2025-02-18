const PressFreedom = () => {
    return (
        <section className="py-8 bg-gray-100">
            <div className="max-w-4xl px-4 mx-auto text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 font-merriweather">
                    Defending Press Freedom
                </h2>
                <p className="mb-6 text-gray-700 font-poppins">
                    &quot;We stand with journalists worldwide facing censorship.
                    Explore resources to support free press:&quot;
                </p>

                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <a
                        href="/press-freedom"
                        className="inline-block px-6 py-2 font-medium text-gray-900 transition-colors duration-300 border border-gray-900 rounded-lg hover:bg-gray-200"
                    >
                        Learn More
                    </a>
                    <a
                        href="/report-censorship"
                        className="inline-block px-6 py-2 font-medium text-white transition-colors duration-300 bg-gray-900 rounded-lg hover:bg-gray-800"
                    >
                        Report Incident
                    </a>
                </div>
            </div>
        </section>
    );
};

export default PressFreedom;
