const EditorialStandards = () => {
    return (
        <section className="p-8 my-4 bg-gray-100">
            <h2 className="mb-4 text-2xl font-bold text-center text-gray-900 font-merriweather">
                Our Editorial Standards
            </h2>
            {/* Intro Paragraph */}
            <p className="max-w-3xl mx-auto mb-8 text-center text-gray-700 font-poppins">
                We strive to uphold the highest standards of journalism. Below
                are our core principles that guide every piece of content we
                publish.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Card 1 */}
                <div className="p-6 transition-shadow duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl">
                    <h3 className="flex items-center gap-2 mb-2 text-lg font-medium">
                        <svg
                            className="w-5 h-5 text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Accuracy First
                    </h3>
                    <p className="text-sm text-gray-600 font-poppins">
                        All facts are verified by our editorial team before
                        publication. We cross-check with multiple reputable
                        sources to ensure our content is error-free and
                        trustworthy.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="p-6 transition-shadow duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl">
                    <h3 className="flex items-center gap-2 mb-2 text-lg font-medium">
                        <svg
                            className="w-5 h-5 text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {/* Unbiased Reporting Icon (scale) */}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                            />
                        </svg>
                        Unbiased Reporting
                    </h3>
                    <p className="text-sm text-gray-600 font-poppins">
                        We maintain complete editorial independence. Our
                        journalists and editors follow strict guidelines to
                        present balanced, fact-based information without favor
                        or bias.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="p-6 transition-shadow duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl">
                    <h3 className="flex items-center gap-2 mb-2 text-lg font-medium">
                        <svg
                            className="w-5 h-5 text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {/* Verified Sources Icon (check-circle) */}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Verified Sources
                    </h3>
                    <p className="text-sm text-gray-600 font-poppins">
                        Every claim we make is traced back to primary sources or
                        expert testimony. We believe that transparency in
                        sourcing fosters trust and credibility.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default EditorialStandards;
