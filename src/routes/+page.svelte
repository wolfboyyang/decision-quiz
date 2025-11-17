<script lang="ts">
    import { ChevronLeft, ChevronRight, House } from "@lucide/svelte";
    import { QUIZ_DATA } from "$lib/quiz";
    import IntroductionBackground from "$lib/assets/backgrounds/introduction.png?enhanced";
    import HomeBackground from "$lib/assets/backgrounds/home.png?enhanced";
    import QuizBackground from "$lib/assets/backgrounds/quiz.png?enhanced";
    import FeedbackBackground from "$lib/assets/backgrounds/feedback.png?enhanced";

    let currentQuizId: number = $state(-1);
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

<div class="w-screen h-screen p-4 flex items-center justify-center font-sans">
    <main
        class="w-full h-full rounded-xl shadow-2xl overflow-hidden min-h-[700px] flex justify-center items-center"
    >
        {#if currentQuizId === -1}
            <!-- Introduction -->
            <enhanced:img
                src={IntroductionBackground}
                alt="Introduction Background"
                class="absolute top-0 left-0 w-screen h-screen -z-1"
            />
            <div class="w-full h-full flex flex-col">
                <div class="h-1/4 flex items-center justify-center">
                    <h1 class="text-6xl font-bold">Kviz navodila</h1>
                </div>
                <div class="grow w-full grid grid-cols-5">
                    <div class="h-2/3 col-start-3 col-span-2">
                        <div class="h-full flex flex-col">
                            <div
                                class="space-y-4 text-gray-700 xl:text-xl 2xl:text-3xl"
                            >
                                <p>
                                    Vsak dan sprejemamo odločitve. Majhne in
                                    velike. Včasih gre za denar, drugič za
                                    odnose, zaupanje ali poštenost. Prav iz
                                    takih trenutkov se učimo in spoznavamo, kdo
                                    smo ter kaj nam je pomembno.
                                </p>
                                <p>
                                    V naslednjih osmih scenarijih so
                                    predstavljene različne življenjske
                                    situacije. Te vas bodo spodbudile k
                                    razmisleku, kako bi se v posameznem primeru
                                    odločili in ravnali. Za vsako odločitev
                                    boste prejeli povratno informacijo, ki vam
                                    bo pomagala ozavestiti in razumeti posledice
                                    vaše izbire ter razloge, ki so vas do nje
                                    vodili. Ni vedno ene same tako imenovane
                                    pravilne rešitve.
                                </p>
                                <p>
                                    Pomembno je, da razmislite, kako bi se v
                                    dani situaciji odzvali in poskušate
                                    predvideti, kako bi vaša odločitev vplivala
                                    na vas in druge.
                                </p>
                            </div>
                        </div>
                        <div class="text-center">
                            <button
                                onclick={goHome}
                                class="bg-[#1aa7d3] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-4xl"
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
            <div class="w-full h-full flex flex-col items-center">
                <div class="h-1/4 flex items-center justify-center">
                    <h1 class="text-4xl font-bold">Kviz Odločitev</h1>
                </div>

                <div class="w-5/8 h-1/2">
                    <div
                        class="w-full h-full grid grid-cols-4 grid-rows-2 justify-center items-center p-2"
                    >
                        {#each QUIZ_DATA as quiz, index}
                            <div
                                class="w flex items-center justify-center p-16"
                            >
                                <button
                                    title={quiz.title}
                                    class="rounded-lg shadow-md p-2 m-2 bg-white cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg"
                                    onclick={() => handleSelectQuiz(index + 1)}
                                >
                                    <enhanced:img
                                        src={quiz.image}
                                        alt={quiz.title}
                                        class="rounded-md mb-4"
                                    />
                                    <p>{quiz.title}</p>
                                </button>
                            </div>
                        {/each}
                    </div>
                    <div
                        class="w-full inline-flex justify-center items-center gap-20"
                    >
                        <div
                            class="col-span-2 flex items-center justify-center"
                        >
                            <button
                                onclick={goToIntroduction}
                                class="inline-flex items-center bg-[#1aa7d3] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors text-4xl"
                            >
                                ← Kviz navodila
                            </button>
                        </div>
                        <div
                            class="col-span-2 flex items-center justify-center"
                        >
                            <button
                                onclick={handleStart}
                                class="inline-flex items-center bg-[#1aa7d3] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors text-4xl"
                            >
                                {QUIZ_DATA[0].title} →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        {:else if quiz !== null}
            <div class="w-full h-full flex items-center">
                <div class="w-1/4 h-full"></div>
                <!-- Main Quiz Content -->
                <div class="w-1/2 h-1/2 flex flex-col justify-between">
                    <!-- Header & Navigation -->
                    <div
                        class="flex justify-between items-center mb-6 text-xl md:text-2xl font-bold text-gray-800 text-center p-4 rounded-lg"
                    >
                        <button
                            onclick={handlePrevQuiz}
                            disabled={currentQuizId < 2}
                            class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft class="w-6 h-6 text-gray-600" />
                        </button>
                        <div class="p-4 grow bg-gray-300">
                            <h2
                                class="text-xl font-bold text-gray-800 text-center uppercase"
                            >
                                {quiz.title}
                            </h2>
                        </div>
                        <button
                            onclick={handleNextQuiz}
                            disabled={isLastQuiz}
                            class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight class="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                    <div class="grow flex flex-col justify-between">
                        <!-- Scenario -->
                        <p
                            class="text-white text-2xl p-4 my-8 bg-[#1aa7d3] rounded-2xl"
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
                            <div class="space-y-4">
                                {#each Object.entries(quiz.options) as [option, text]}
                                    <button
                                        class={`w-full border-2 rounded-lg p-4 flex items-center space-x-4 cursor-pointer transition-all ${
                                            selectedOption === option
                                                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                                                : "border-gray-200 hover:bg-gray-50"
                                        }`}
                                        onclick={() =>
                                            handleSelectOption(option)}
                                    >
                                        <div
                                            class="shrink-0 w-8 h-8 rounded-full font-bold flex items-center justify-center text-xl bg-gray-200 text-gray-700"
                                        >
                                            {option}
                                        </div>
                                        <p
                                            class="text-gray-800 text-left text-xl"
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
                            <div class="animate-fadeIn mt-4">
                                <h3
                                    class="text-xl font-semibold mb-4 text-gray-800"
                                >
                                    POVRATNA INFORMACIJA
                                </h3>
                                <div
                                    class="p-4 rounded-lg bg-blue-50 border-l-4 border-gray-400"
                                >
                                    <p class="text-gray-800 font-semibold">
                                        {quiz.feedback[selectedOption]}
                                    </p>
                                </div>
                            </div>
                        {/if}
                        <!-- Persistent Bottom Navigation -->
                        <div class="flex flex-col sm:flex-row gap-4 mt-8">
                            {#if selectedOption !== ""}
                                <button
                                    onclick={handleTryAnother}
                                    class="w-full sm:w-1/2 bg-gray-200 text-gray-800 text-4xl font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    ⟳ Poskusi drugega
                                </button>
                            {:else}
                                <button
                                    onclick={handlePrevQuiz}
                                    class="w-full sm:w-1/2 bg-[#1aa7d3] text-white text-4xl font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors"
                                >
                                    ← {currentQuizId > 1
                                        ? QUIZ_DATA[currentQuizId - 2].title
                                        : "Pojdi na domačo stran"}
                                </button>
                            {/if}

                            {#if isLastQuiz}
                                <button
                                    onclick={goHome}
                                    class="w-full sm:w-1/2 bg-[#1aa7d3] text-white text-4xl font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors"
                                >
                                    Pojdi na domačo stran
                                </button>
                            {:else}
                                <button
                                    onclick={handleNextQuiz}
                                    class="w-full sm:w-1/2 bg-[#1aa7d3] text-white text-4xl font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-[#168db3] transition-colors"
                                >
                                    {QUIZ_DATA[currentQuizId].title} →
                                </button>
                            {/if}
                        </div>
                    </div>
                </div>

                <!-- Vertical Slider -->
                <div
                    class="w-20 flex flex-col items-center justify-center space-y-2 bg-gray-50 p-4 rounded-r-xl"
                >
                    <button
                        onclick={goHome}
                        class="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-200 rounded-full"
                        title="Go to Home"
                    >
                        <House class="w-6 h-6" />
                    </button>
                    <div class="h-8"></div>
                    <!-- Spacer -->
                    {#each QUIZ_DATA as quiz, index}
                        <button
                            class={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer ${
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
