<script lang="ts">
    import { ChevronLeft, ChevronRight, House } from "@lucide/svelte";
    import { QUIZ_DATA } from "$lib/quiz";
    import HomeBackground from "$lib/assets/backgrounds/home.png?enhanced";
    import QuizBackground from "$lib/assets/backgrounds/quiz.png?enhanced";
    import FeedbackBackground from "$lib/assets/backgrounds/feedback.png?enhanced";

    let currentQuizId: number = $state(0);
    let selectedOption: string = $state("");
    let showFeedback = $state(false);

    const quiz = $derived(
        currentQuizId > 0 && currentQuizId < QUIZ_DATA.length + 1
            ? QUIZ_DATA[currentQuizId - 1]
            : null,
    );
    const isLastQuiz = $derived(currentQuizId === QUIZ_DATA.length);

    // --- Event Handlers ---
    const handleSelectQuiz = (index: number) => {
        currentQuizId = index;
        selectedOption = "";
        showFeedback = false;
    };

    const handleStart = () => {
        handleSelectQuiz(1);
    };

    const handleHome = () => {
        currentQuizId = 0;
        selectedOption = "";
        showFeedback = false;
    };

    const handleNextQuiz = () => {
        if (currentQuizId < QUIZ_DATA.length) {
            handleSelectQuiz(currentQuizId + 1);
        }
    };

    const handlePrevQuiz = () => {
        if (currentQuizId > 0) {
            handleSelectQuiz(currentQuizId - 1);
        }
    };

    const handleSelectOption = (optionId: string) => {
        if (!showFeedback) {
            selectedOption = optionId;
        }
    };

    const handleConfirm = () => {
        if (selectedOption) {
            showFeedback = true;
        }
    };

    const handleTryAnother = () => {
        selectedOption = "";
        showFeedback = false;
    };
</script>

<div class="w-screen h-screen p-4 flex items-center justify-center font-sans">
    <main
        class="w-full h-full rounded-xl shadow-2xl overflow-hidden min-h-[700px] flex justify-center items-center"
    >
        {#if currentQuizId === 0}
            <!-- Render the Home Screen -->
            <div class="w-1/2 p-8 md:p-12 text-center">
                <enhanced:img
                    src={HomeBackground}
                    alt="Home Background"
                    class="absolute top-20 left-0 w-full h-full -z-1 rounded-md mb-2"
                />
                <h1 class="text-3xl font-bold text-gray-800 mb-4">
                    Kviz Odločitev
                </h1>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {#each QUIZ_DATA as quiz, index}
                        <button
                            title={quiz.title}
                            class="rounded-lg shadow-md p-3 bg-white cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg"
                            onclick={() => handleSelectQuiz(index + 1)}
                        >
                            <enhanced:img
                                src={quiz.image}
                                alt={quiz.title}
                                class="w-full h-auto rounded-md mb-2"
                            />
                        </button>
                    {/each}
                </div>

                <button
                    onclick={handleStart}
                    class="w-full bg-[#1aa7d3] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors text-lg"
                >
                    Začni kviz
                </button>
            </div>
        {:else if quiz !== null}
            <div class="h-2/3 grid grid-cols-5">
                <!-- Main Quiz Content -->
                <div class="col-start-2 col-span-3 p-8 md:p-12 overflow-y-auto">
                    <!-- Header & Navigation -->
                    <div class="flex justify-between items-center mb-6">
                        <button
                            onclick={handlePrevQuiz}
                            disabled={currentQuizId < 2}
                            class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft class="w-6 h-6 text-gray-600" />
                        </button>
                        <h2
                            class="text-xl md:text-2xl font-bold text-gray-800 text-center"
                        >
                            Scenarij {quiz.id}: {quiz.title}
                        </h2>
                        <button
                            onclick={handleNextQuiz}
                            disabled={isLastQuiz}
                            class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight class="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    <!-- Scenario -->
                    <p class="text-gray-700 text-lg mb-8">{quiz.scenario}</p>

                    <!-- Show Options OR Feedback -->
                    {#if !showFeedback}
                        <!-- Options View -->
                        <enhanced:img
                            src={QuizBackground}
                            alt="Home Background"
                            class="absolute top-0 left-0 w-full h-full -z-1 rounded-md mb-2"
                        />
                        <div class="space-y-4">
                            {#each Object.entries(quiz.options) as [option, text]}
                                <button
                                    class={`w-full border-2 rounded-lg p-4 flex items-center space-x-4 cursor-pointer transition-all ${
                                        selectedOption === option
                                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                                            : "border-gray-200 hover:bg-gray-50"
                                    }`}
                                    onclick={() => handleSelectOption(option)}
                                >
                                    <div
                                        class={`shrink-0 w-8 h-8 rounded-full font-bold flex items-center justify-center ${
                                            selectedOption === option
                                                ? "bg-[#1aa7d3] text-white"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {option}
                                    </div>
                                    <p class="text-gray-800 text-left">
                                        {text}
                                    </p>
                                </button>
                            {/each}
                            <button
                                onclick={handleConfirm}
                                disabled={!selectedOption}
                                class="w-full bg-[#1aa7d3] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors text-lg mt-8 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Potrdi
                            </button>
                        </div>
                    {:else if selectedOption !== ""}
                        <!-- Feedback View -->
                        <enhanced:img
                            src={FeedbackBackground}
                            alt="Home Background"
                            class="absolute top-0 left-0 w-full h-full -z-1 rounded-md mb-2"
                        />
                        <div
                            class="border-2 rounded-lg p-4 flex items-center space-x-4 cursor-pointer transition-all border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                        >
                            <div
                                class="shrink-0 w-8 h-8 rounded-full font-bold flex items-center justify-center bg-[#1aa7d3] text-white"
                            >
                                {selectedOption}
                            </div>
                            <p class="text-gray-800">
                                {quiz.options[selectedOption]}
                            </p>
                        </div>
                        <div class="animate-fadeIn">
                            <h3
                                class="text-xl font-semibold mb-4 text-gray-800"
                            >
                                POVRATNA INFORMACIJA
                            </h3>
                            <div
                                class="p-4 rounded-lg bg-blue-50 border-l-4 border-blue-400"
                            >
                                <p class="text-gray-800">
                                    {quiz.feedback[selectedOption]}
                                </p>
                            </div>

                            <div class="flex flex-col sm:flex-row gap-4 mt-8">
                                <button
                                    onclick={handleTryAnother}
                                    class="w-full sm:w-1/2 bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Poskusi drugega
                                </button>

                                {#if isLastQuiz}
                                    <button
                                        onclick={handleHome}
                                        class="w-full sm:w-1/2 bg-[#1aa7d3] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors"
                                    >
                                        Pojdi na domačo stran
                                    </button>
                                {:else}
                                    <button
                                        onclick={handleNextQuiz}
                                        class="w-full sm:w-1/2 bg-[#1aa7d3] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors"
                                    >
                                        Naslednji kviz
                                    </button>
                                {/if}
                            </div>
                        </div>
                    {/if}
                </div>

                <!-- Vertical Slider -->
                <div
                    class="w-20 flex flex-col items-center justify-center space-y-2 bg-gray-50 p-4 rounded-r-xl"
                >
                    <button
                        onclick={handleHome}
                        class="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-200 rounded-full"
                        title="Go to Home"
                    >
                        <House class="w-6 h-6" />
                    </button>
                    <div class="h-8"></div>
                    <!-- Spacer -->
                    {#each QUIZ_DATA as quiz, index}
                        <button
                            class={`w-2.5 h-10 rounded-full cursor-pointer ${
                                index + 1 === currentQuizId
                                    ? "bg-[#1aa7d3]"
                                    : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            onclick={() => handleSelectQuiz(index + 1)}
                            title={`Pojdi na kviz ${index + 1}: ${quiz.title}`}
                        ></button>
                    {/each}
                </div>
            </div>
        {/if}
    </main>
</div>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
    }
</style>
