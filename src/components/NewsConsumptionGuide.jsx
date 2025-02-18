const NewsConsumptionGuide = () => {
    return (
        <section className="p-8 rounded shadow-sm bg-gray-50 md:p-10">
            {/* Section Title */}
            <h2 className="mb-2 text-2xl font-bold text-center text-gray-900 md:text-3xl font-merriweather">
                Smart News Reading
            </h2>

            {/* Introduction Text */}
            <p className="max-w-2xl mx-auto mb-6 text-center text-gray-600 font-poppins">
                Follow these quick steps to verify information and become a more
                informed reader.
            </p>

            {/* Steps Container */}
            <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-white bg-blue-600 rounded-full">
                        1
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Check the publication date
                        </h3>
                        <p className="text-sm text-gray-600 font-poppins">
                            Make sure the article is current and relevant to the
                            story or event you’re reading about.
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-white bg-blue-600 rounded-full">
                        2
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Look for author credentials
                        </h3>
                        <p className="text-sm text-gray-600 font-poppins">
                            Research the writer’s background to ensure
                            credibility and expertise in the topic.
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-white bg-blue-600 rounded-full">
                        3
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Verify with official sources
                        </h3>
                        <p className="text-sm text-gray-600 font-poppins">
                            Cross-check the information with recognized
                            institutions or direct statements.
                        </p>
                    </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-white bg-blue-600 rounded-full">
                        4
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Check for supporting evidence
                        </h3>
                        <p className="text-sm text-gray-600 font-poppins">
                            Ensure that the article cites reputable sources,
                            data, or expert opinions to back its claims.
                        </p>
                    </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 font-bold text-white bg-blue-600 rounded-full">
                        5
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Report suspicious content
                        </h3>
                        <p className="text-sm text-gray-600 font-poppins">
                            If you find misleading or harmful information,
                            report it to relevant platforms or fact-checking
                            sites.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsConsumptionGuide;
