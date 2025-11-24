<script lang="ts">
    import {
        ChevronLeft,
        ChevronRight,
        Expand,
        House,
        Shrink,
    } from "@lucide/svelte";
    import { QUIZ_DATA } from "$lib/quiz";
    import Background from "$lib/assets/backgrounds/bg.png?enhanced";
    import IntroductionCharacter from "$lib/assets/backgrounds/c0.png?enhanced";
    import QuizCharacter from "$lib/assets/backgrounds/c1.png?enhanced";
    import FeedbackCharacter from "$lib/assets/backgrounds/c2.png?enhanced";

    let currentQuizId: number = $state(-1);
    let selectedOption: string = $state("");
    let showFeedback = $state(false);
    let mainElement: HTMLElement;
    let isFullScreen = $state(false);

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            // If the document is not in full screen mode
            // make the video full screen
            mainElement.requestFullscreen();
            isFullScreen = true;
        } else {
            // Otherwise exit the full screen
            document.exitFullscreen?.();
            isFullScreen = false;
        }
    }

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

    const goToIntroduction = () => {
        currentQuizId = -1;
        selectedOption = "";
        showFeedback = false;
    };

    const goHome = () => {
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
            showFeedback = true;
        }
    };

    const handleTryAnother = () => {
        selectedOption = "";
        showFeedback = false;
    };
</script>

<main
    class="w-screen h-screen flex justify-center items-center font-sans"
    bind:this={mainElement}
>
    <button
        class="absolute bottom-2 right-2 hover:text-gray-600 z-2"
        onclick={toggleFullScreen}
    >
        {#if isFullScreen}
            <Shrink />
        {:else}
            <Expand />
        {/if}
    </button>
    <enhanced:img
        src={Background}
        alt="Introduction Background"
        class="absolute top-0 left-0 w-screen h-screen -z-1"
    />
    {#if currentQuizId === -1}
        <!-- Introduction -->
        <div class="w-full h-full flex flex-col items-center p-1 md:p-10">
            <h1
                class="w-1/2 z-1 p-1 rounded-lg md:p-4 md:rounded-xl bg-gray-400 md:text-2xl text-lg text-center font-bold"
            >
                Navodila za kviz
            </h1>
            <div
                class="w-full h-full md:w-4/5 relative -top-2 md:-top-8 border-2 rounded-xl border-gray-400"
            >
                <div
                    class="w-full h-full mt-1 flex portrait:flex-col items-center md:p-4 md:gap-4"
                >
                    <div
                        class="w-full h-4/5 portrait:w-1/3 portrait:h-auto items-center justify-center flex"
                    >
                        <enhanced:img
                            src={IntroductionCharacter}
                            alt="Introduction Background"
                        />
                    </div>
                    <div class="h-4/5 flex flex-col p-1 justify-between">
                        <div
                            class="space-y-1 md:space-y-4 text-gray-700 text-xs md:text-xl"
                        >
                            <p>
                                Vsak dan sprejemamo odločitve. Majhne in velike.
                                Včasih gre za denar, drugič za odnose, zaupanje
                                ali poštenost. Prav iz takih trenutkov se učimo
                                in spoznavamo, kdo smo ter kaj nam je pomembno.
                            </p>
                            <p>
                                V naslednjih osmih scenarijih so predstavljene
                                različne življenjske situacije. Te vas bodo
                                spodbudile k razmisleku, kako bi se v posameznem
                                primeru odločili in ravnali. Za vsako odločitev
                                boste prejeli povratno informacijo, ki vam bo
                                pomagala ozavestiti in razumeti posledice vaše
                                izbire ter razloge, ki so vas pripeljali do nje.
                                V nekaterih primerih ne obstaja le ena rešitev.
                            </p>
                            <p>
                                Pomembno je, da razmislite, kako bi se v dani
                                situaciji odzvali, in poskušate predvideti, kako
                                bi vaša odločitev vplivala na vas in druge.
                            </p>
                        </div>
                        <div class="mt-1 mb-4 md:mt-8 text-center">
                            <button
                                onclick={goHome}
                                class="bg-[#1aa7d3] text-white font-bold py-1 px-3 md:py-3 md:px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm md:text-2xl"
                            >
                                Začni kviz →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {:else if currentQuizId === 0}
        <!-- Render the Home Screen -->
        <div class="flex flex-col items-center">
            <h1
                class="w-1/2 z-1 p-1 rounded-lg md:p-4 md:rounded-xl bg-gray-400 md:text-2xl text-xl text-center font-bold"
            >
                Kviz: Odločitev
            </h1>
            <div
                class="w-3/4 md:w-7/8 p-2 md:p-8 relative -top-3 md:-top-8 flex flex-col border-2 rounded-xl border-gray-400 items-center"
            >
                <div
                    class="grid grid-cols-4 grid-rows-2 portrait:grid-cols-2 portrait:grid-rows-4 justify-center items-center"
                >
                    {#each QUIZ_DATA as quiz, index}
                        <div
                            class="px-2 py-1 md:p-2 flex items-center justify-center"
                        >
                            <button
                                title={quiz.title}
                                class="rounded-lg shadow-md bg-white cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg"
                                onclick={() => handleSelectQuiz(index + 1)}
                            >
                                <enhanced:img
                                    src={quiz.image}
                                    alt={quiz.title}
                                    class="rounded-md"
                                />
                                <p class="text-[9px] md:text-xl">
                                    {quiz.title}
                                </p>
                            </button>
                        </div>
                    {/each}
                </div>
                <div
                    class="w-full inline-flex portrait:flex-col gap-1 justify-between items-center md:mt-2"
                >
                    <div class="col-span-2 flex items-center justify-center">
                        <button
                            onclick={goToIntroduction}
                            class="inline-flex items-center bg-[#1aa7d3] text-white font-bold py-1 px-3 md:py-3 md:px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors text-sm md:text-xl"
                        >
                            ← Navodila za kviz
                        </button>
                    </div>
                    <div class="col-span-2 flex items-center justify-center">
                        <button
                            onclick={handleStart}
                            class="inline-flex items-center bg-[#1aa7d3] text-white font-bold py-1 px-3 md:py-3 md:px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors text-sm md:text-xl"
                        >
                            {QUIZ_DATA[0].title} →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {:else if quiz !== null}
        <div class="w-full h-full flex portrait:flex-col items-center md:p-10">
            <!-- Main Quiz Content -->
            <div class="w-full h-full flex flex-col justify-between px-1">
                <!-- Header & Navigation -->
                <div
                    class="flex justify-between items-center text-lg md:text-2xl font-bold text-gray-800 text-center md:p-4 rounded-lg"
                >
                    <button
                        onclick={handlePrevQuiz}
                        disabled={currentQuizId < 2}
                        class="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft class="w-6 h-6 text-gray-600" />
                    </button>
                    <div class="md:p-2 grow bg-gray-400">
                        <h2
                            class="text-sm md:text-2xl font-bold text-gray-800 text-center uppercase"
                        >
                            {quiz.title}
                        </h2>
                    </div>
                    <button
                        onclick={handleNextQuiz}
                        disabled={isLastQuiz}
                        class="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight class="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                <div
                    class="w-full h-full flex portrait:flex-col items-center justify-between"
                >
                    <div class="w-1/5 portrait:w-1/4 h-auto">
                        {#if showFeedback}
                            <enhanced:img
                                src={FeedbackCharacter}
                                alt="Feedback"
                            />
                        {:else}
                            <enhanced:img src={QuizCharacter} alt={"Quiz"} />
                        {/if}
                    </div>

                    <div
                        class="w-4/5 h-full portrait:w-full flex flex-col justify-between"
                    >
                        <!-- Scenario -->
                        <p
                            class="text-white text-sm md:text-2xl mb-1 p-1 md:p-4 bg-[#1aa7d3] rounded-sm"
                        >
                            {quiz.scenario}
                        </p>

                        <!-- Show Options OR Feedback -->
                        {#if !showFeedback}
                            <!-- Options View -->
                            <div class="space-y-1">
                                {#each Object.entries(quiz.options) as [option, text]}
                                    <button
                                        class={`w-full border-2 rounded-lg p-1 md:p-4 flex items-center space-x-4 cursor-pointer transition-all ${
                                            selectedOption === option
                                                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                                                : "border-gray-200 hover:bg-gray-50"
                                        }`}
                                        onclick={() =>
                                            handleSelectOption(option)}
                                    >
                                        <div
                                            class="shrink-0 w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm md:text-xl bg-gray-200 text-gray-700"
                                        >
                                            {option}
                                        </div>
                                        <p
                                            class="text-gray-800 text-left text-[12px] md:text-xl"
                                        >
                                            {text}
                                        </p>
                                    </button>
                                {/each}
                            </div>
                        {:else if selectedOption !== ""}
                            <!-- Feedback View -->
                            <div
                                class="border-2 rounded-lg p-1 md:p-4 flex items-center space-x-4 cursor-pointer transition-all border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                            >
                                <div
                                    class="shrink-0 w-8 h-8 rounded-full font-bold flex items-center justify-center bg-[#1aa7d3] text-sm md:text-xl text-gray-700"
                                >
                                    {selectedOption}
                                </div>
                                <p class="text-gray-800 text-sm md:text-xl">
                                    {quiz.options[selectedOption]}
                                </p>
                            </div>
                            <div class="animate-fadeIn mt-1 md:mt-4">
                                <div
                                    class="p-1 md:p-4 rounded-lg bg-blue-50 border-l-4 border-gray-400"
                                >
                                    <p
                                        class="text-gray-800 text-sm md:text-xl font-semibold"
                                    >
                                        {quiz.feedback[selectedOption]}
                                    </p>
                                </div>
                            </div>
                        {/if}
                        <!-- Persistent Bottom Navigation -->
                        <div
                            class="flex portrait:flex-col gap-4 mt-1 mb-1 md:mb-25 md:mt-8 justify-between"
                        >
                            {#if selectedOption !== ""}
                                <button
                                    onclick={handleTryAnother}
                                    class="w-1/2 portrait:w-full bg-gray-400 text-gray-800 text-sm md:text-xl font-bold py-1 px-3 md:py-3 md:px-6 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    ⟳ Poskusi drugega
                                </button>
                            {:else}
                                <button
                                    onclick={handlePrevQuiz}
                                    class="w-1/2 portrait:w-full bg-[#1aa7d3] text-white text-sm md:text-xl font-bold py-1 px-3 md:py-3 md:px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors"
                                >
                                    ← {currentQuizId > 1
                                        ? QUIZ_DATA[currentQuizId - 2].title
                                        : "Pojdi na domačo stran"}
                                </button>
                            {/if}

                            {#if isLastQuiz}
                                <button
                                    onclick={goHome}
                                    class="w-1/2 portrait:w-full bg-[#1aa7d3] text-white text-sm md:text-xl font-bold py-1 px-3 md:py-3 md:px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors"
                                >
                                    Pojdi na domačo stran
                                </button>
                            {:else}
                                <button
                                    onclick={handleNextQuiz}
                                    class="w-1/2 portrait:w-full bg-[#1aa7d3] text-white text-sm md:text-xl font-bold py-1 px-3 md:py-3 md:px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors"
                                >
                                    {QUIZ_DATA[currentQuizId].title} →
                                </button>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Vertical Slider -->
            <div
                class="w-1/16 portrait:w-full md:w-20 flex flex-col portrait:flex-row items-center justify-center space-y-2 portrait:space-y-0 portrait:space-x-1 bg-gray-50 p-2"
            >
                <button
                    onclick={goHome}
                    class="portrait:relative portrait:-left-2 text-gray-500 hover:text-blue-600 hover:bg-gray-200 rounded-full"
                    title="Go to Home"
                >
                    <House class="w-6 h-6" />
                </button>
                {#each QUIZ_DATA as quiz, index}
                    <button
                        class={`portrait:relative portrait:-left-2 size-6 md:size-10 rounded-full flex items-center justify-center font-bold text-sm md:text-lg cursor-pointer ${
                            index + 1 === currentQuizId
                                ? "bg-[#1aa7d3] text-white"
                                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                        }`}
                        onclick={() => handleSelectQuiz(index + 1)}
                        title={`Pojdi na kviz ${index + 1}: ${quiz.title}`}
                    >
                        {String(quiz.id).padStart(2, "0")}
                    </button>
                {/each}
            </div>
        </div>
    {/if}
</main>

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
