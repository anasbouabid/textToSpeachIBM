const voices = [
    "ar-MS_OmarVoice",
    "cs-CZ_AlenaVoice",
    "de-DE_BirgitV3Voice",
    "de-DE_DieterV3Voice",
    "de-DE_ErikaV3Voice",
    "en-AU_CraigVoice",
    "en-AU_MadisonVoice",
    "en-AU_SteveVoice",
    "en-GB_CharlotteV3Voice",
    "en-GB_JamesV3Voice",
    "en-GB_KateV3Voice",
    "en-US_AllisonExpressive",
    "en-US_AllisonV3Voice",
    "en-US_EmilyV3Voice",
    "en-US_EmmaExpressive",
    "en-US_HenryV3Voice",
    "en-US_KevinV3Voice",
    "en-US_LisaExpressive",
    "en-US_LisaV3Voice",
    "en-US_MichaelExpressive",
    "en-US_MichaelV3Voice",
    "en-US_OliviaV3Voice",
    "es-ES_EnriqueV3Voice",
    "es-ES_LauraV3Voice",
    "es-LA_SofiaV3Voice",
    "es-US_SofiaV3Voice",
    "fr-CA_LouiseV3Voice",
    "fr-FR_NicolasV3Voice",
    "fr-FR_ReneeV3Voice",
    "it-IT_FrancescaV3Voice",
    "ja-JP_EmiV3Voice",
    "ko-KR_HyunjunVoice",
    "ko-KR_SiWooVoice",
    "ko-KR_YoungmiVoice",
    "ko-KR_YunaVoice",
    "nl-BE_AdeleVoice",
    "nl-BE_BramVoice",
    "nl-NL_EmmaVoice",
    "nl-NL_LiamVoice",
    "pt-BR_IsabelaV3Voice",
    "sv-SE_IngridVoice",
    "zh-CN_LiNaVoice",
    "zh-CN_WangWeiVoice",
    "zh-CN_ZhangJingVoice",
]
const types = [
    "audio/alaw",
    "audio/basic",
    "audio/flac",
    "audio/l16",
    "audio/mp3",
    "audio/mpeg",
    "audio/mulaw",
    "audio/ogg",
    "audio/ogg;codecs=opus",
    "audio/ogg;codecs=vorbis",
    "audio/wav",
    "audio/webm",
    "audio/webm;codecs=opus",
    "audio/webm;codecs=vorbis",
    "*/*",
]

const generateBtn = document.querySelector("#generateBtn")
const voiceSelect = document.querySelector("#voiceSelect");
const audioTypeSelect = document.querySelector("#audioTypeSelect");
const textArea = document.querySelector("#textArea");



const ctx = new AudioContext();



window.addEventListener("load", () => {
    for (let voice of voices) {
        let opt = document.createElement("option");
        opt.value = voice
        opt.textContent = voice
        voiceSelect.appendChild(opt)
    }
    for (let type of types) {
        let opt = document.createElement("option");
        opt.value = type
        opt.textContent = type
        audioTypeSelect.appendChild(opt)
    }
})

generateBtn.addEventListener("click", () => {
    generateBtn.textContent = "Loading..."
    fetch('https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/7ab99389-41b0-4f60-b91a-5cc777526b2b/v1/synthesize?voice=' + voiceSelect.value, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': audioTypeSelect.value,
            'Authorization': 'Basic ' + btoa('apikey:wUIkj_NmgKa-IX0RD0Phe7cNuJixAxDh4-MGYE-FLJO_')
        },
        body: JSON.stringify({
            'text': textArea.value
        })
    }).then(data => data.arrayBuffer())
        .then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
            const playSound = ctx.createBufferSource();
            playSound.buffer = decodedAudio;
            playSound.connect(ctx.destination);
            playSound.start(ctx.currentTime);

            generateBtn.textContent = "Generate"            
        })
})