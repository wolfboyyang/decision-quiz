<script lang="ts">
    import { ChevronLeft, ChevronRight, House } from "@lucide/svelte";
    import { QUIZ_DATA } from "$lib/quiz";
    import IntroductionBackground from "$lib/assets/backgrounds/introduction.png?enhanced";
    import HomeBackground from "$lib/assets/backgrounds/home.png?enhanced";
    import QuizBackground from "$lib/assets/backgrounds/quiz.png?enhanced";
    import FeedbackBackground from "$lib/assets/backgrounds/feedback.png?enhanced";

    let currentQuizId: number = $state(1);
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

<main class="w-screen h-screen flex justify-center items-center font-sans">
    {#if currentQuizId === -1}
        <!-- Introduction -->
        <enhanced:img
            src={IntroductionBackground}
            alt="Introduction Background"
            class="absolute top-0 left-0 w-screen h-screen -z-1"
        />
        <div class="flex flex-col">
            <div class="flex items-center justify-center">
                <h1 class="p-6 xl:p-28 xl:text-4xl text-2xl font-bold">
                    Kviz navodila
                </h1>
            </div>
            <div class="grow flex">
                <div class="w-3/8"></div>
                <div class="w-15/32 flex flex-col">
                    <div
                        class="space-y-1 xl:space-y-4 text-gray-700 text-[10px] xl:text-2xl"
                    >
                        <p>
                            Vsak dan sprejemamo odločitve. Majhne in velike.
                            Včasih gre za denar, drugič za odnose, zaupanje ali
                            poštenost. Prav iz takih trenutkov se učimo in
                            spoznavamo, kdo smo ter kaj nam je pomembno.
                        </p>
                        <p>
                            V naslednjih osmih scenarijih so predstavljene
                            različne življenjske situacije. Te vas bodo
                            spodbudile k razmisleku, kako bi se v posameznem
                            primeru odločili in ravnali. Za vsako odločitev
                            boste prejeli povratno informacijo, ki vam bo
                            pomagala ozavestiti in razumeti posledice vaše
                            izbire ter razloge, ki so vas do nje vodili. Ni
                            vedno ene same tako imenovane pravilne rešitve.
                        </p>
                        <p>
                            Pomembno je, da razmislite, kako bi se v dani
                            situaciji odzvali in poskušate predvideti, kako bi
                            vaša odločitev vplivala na vas in druge.
                        </p>
                    </div>
                    <div class="mt-2 xl:mt-8 text-center">
                        <button
                            onclick={goHome}
                            class="bg-[#1aa7d3] text-white font-bold py-1 px-3 xl:py-3 xl:px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm xl:text-2xl"
                        >
                            Začni kviz →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {:else if currentQuizId === 0}
        <!-- Render the Home Screen -->
        <enhanced:img
            src={HomeBackground}
            alt="Home Background"
            class="absolute top-0 left-0 w-screen h-screen -z-1"
        />
        <div class="flex flex-col items-center">
            <div class="flex items-center justify-center">
                <h1 class="pt-8 pb-1 xl:p-28 xl:text-4xl text-2xl font-bold">
                    Kviz Odločitev
                </h1>
            </div>

            <div class="w-5/8 h-1/2">
                <div
                    class="grid grid-cols-4 grid-rows-2 justify-center items-center"
                >
                    {#each QUIZ_DATA as quiz, index}
                        <div class="p-2 flex items-center justify-center">
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
                                <p class="text-[9px] xl:text-xl">
                                    {quiz.title}
                                </p>
                            </button>
                        </div>
                    {/each}
                </div>
                <div
                    class="w-full inline-flex justify-center items-center gap-20"
                >
                    <div class="col-span-2 flex items-center justify-center">
                        <button
                            onclick={goToIntroduction}
                            class="inline-flex items-center bg-[#1aa7d3] text-white font-bold py-1 px-3 xl:py-3 xl:px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors text-sm xl:text-xl"
                        >
                            ← Kviz navodila
                        </button>
                    </div>
                    <div class="col-span-2 flex items-center justify-center">
                        <button
                            onclick={handleStart}
                            class="inline-flex items-center bg-[#1aa7d3] text-white font-bold py-1 px-3 xl:py-3 xl:px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors text-sm xl:text-xl"
                        >
                            {QUIZ_DATA[0].title} →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {:else if quiz !== null}
        <div class="w-full h-full flex items-center">
            <div class="w-1/4"></div>
            <!-- Main Quiz Content -->
            <div class="w-11/16 h-full flex flex-col justify-between">
                <!-- Header & Navigation -->
                <div
                    class="flex justify-between items-center mt-1 xl:mt-8 xl:mb-6 text-lg md:text-2xl font-bold text-gray-800 text-center p-2 xl:p-4 rounded-lg"
                >
                    <button
                        onclick={handlePrevQuiz}
                        disabled={currentQuizId < 2}
                        class="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft class="w-6 h-6 text-gray-600" />
                    </button>
                    <div class="p-2 grow bg-gray-300">
                        <h2
                            class="text-lg font-bold text-gray-800 text-center uppercase"
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
                <div class="grow flex flex-col justify-between">
                    <!-- Scenario -->
                    <p
                        class="text-white text-sm xl:text-2xl p-2 mb-1 xl:p-4 bg-[#1aa7d3] rounded-2xl"
                    >
                        {quiz.scenario}
                    </p>

                    <!-- Show Options OR Feedback -->
                    {#if !showFeedback}
                        <!-- Options View -->
                        <enhanced:img
                            src={QuizBackground}
                            alt="Quiz Background"
                            class="absolute top-0 left-0 w-screen h-screen -z-1"
                        />
                        <div class="space-y-1">
                            {#each Object.entries(quiz.options) as [option, text]}
                                <button
                                    class={`border-2 rounded-lg p-1 xl:p-4 flex items-center space-x-4 cursor-pointer transition-all ${
                                        selectedOption === option
                                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                                            : "border-gray-200 hover:bg-gray-50"
                                    }`}
                                    onclick={() => handleSelectOption(option)}
                                >
                                    <div
                                        class="shrink-0 w-8 h-8 rounded-full font-bold flex items-center justify-center text-sm xl:text-xl bg-gray-200 text-gray-700"
                                    >
                                        {option}
                                    </div>
                                    <p
                                        class="text-gray-800 text-left text-[12px] xl:text-xl"
                                    >
                                        {text}
                                    </p>
                                </button>
                            {/each}
                        </div>
                    {:else if selectedOption !== ""}
                        <!-- Feedback View -->
                        <enhanced:img
                            src={FeedbackBackground}
                            alt="Feedback Background"
                            class="absolute top-0 left-0 w-full h-full -z-1"
                        />
                        <div
                            class="border-2 rounded-lg p-1 xl:p-4 flex items-center space-x-4 cursor-pointer transition-all border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                        >
                            <div
                                class="shrink-0 w-8 h-8 rounded-full font-bold flex items-center justify-center bg-[#1aa7d3] text-sm xl:text-xl text-gray-700"
                            >
                                {selectedOption}
                            </div>
                            <p class="text-gray-800 text-sm xl:text-xl">
                                {quiz.options[selectedOption]}
                            </p>
                        </div>
                        <div class="animate-fadeIn mt-1 xl:mt-4">
                            <div
                                class="p-1 xl:p-4 rounded-lg bg-blue-50 border-l-4 border-gray-400"
                            >
                                <p
                                    class="text-gray-800 text-sm xl:text-xl font-semibold"
                                >
                                    {quiz.feedback[selectedOption]}
                                </p>
                            </div>
                        </div>
                    {/if}
                    <!-- Persistent Bottom Navigation -->
                    <div class="flex gap-4 mt-1 mb-1 xl:mb-8 xl:mt-8">
                        {#if selectedOption !== ""}
                            <button
                                onclick={handleTryAnother}
                                class="w-1/2 bg-gray-200 text-gray-800 text-sm xl:text-4xl font-bold py-1 px-3 xl:py-3 xl:px-6 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                ⟳ Poskusi drugega
                            </button>
                        {:else}
                            <button
                                onclick={handlePrevQuiz}
                                class="w-1/2 bg-[#1aa7d3] text-white text-sm xl:text-4xl font-bold py-1 px-3 xl:py-3 xl:px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors"
                            >
                                ← {currentQuizId > 1
                                    ? QUIZ_DATA[currentQuizId - 2].title
                                    : "Pojdi na domačo stran"}
                            </button>
                        {/if}

                        {#if isLastQuiz}
                            <button
                                onclick={goHome}
                                class="w-1/2 bg-[#1aa7d3] text-white text-sm xl:text-4xl font-bold py-1 px-3 xl:py-3 xl:px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors"
                            >
                                Pojdi na domačo stran
                            </button>
                        {:else}
                            <button
                                onclick={handleNextQuiz}
                                class="w-1/2 bg-[#1aa7d3] text-white text-sm xl:text-4xl font-bold py-1 px-3 xl:py-3 xl:px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors"
                            >
                                {QUIZ_DATA[currentQuizId].title} →
                            </button>
                        {/if}
                    </div>
                </div>
            </div>

            <!-- Vertical Slider -->
            <div
                class="w-8 xl:w-20 flex flex-col items-center justify-center space-y-2 bg-gray-50 p-2 rounded-r-xl"
            >
                <button
                    onclick={goHome}
                    class="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-200 rounded-full"
                    title="Go to Home"
                >
                    <House class="w-6 h-6" />
                </button>
                <!-- Spacer -->
                <div class="xl:h-8"></div>
                {#each QUIZ_DATA as quiz, index}
                    <button
                        class={`size-6 xl:size-10 rounded-full flex items-center justify-center font-bold text-sm xl:text-lg cursor-pointer ${
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
