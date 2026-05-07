// THE MASTER GRID: Update skills and discount codes here!
const OMNI_CONFIG = {

// The master list of all 12 potential skills (Ordered 1 through 12)
    masterSkillList: [
        "Resistor", // Skill 1 (from Libertarian Utopia)
        "Skill 2",  // Placeholders for future paths
        "Skill 3", 
        "Skill 4", 
        "Skill 5", 
        "Skill 6", 
        "Skill 7", 
        "Skill 8", 
        "Skill 9", 
        "Skill 10", 
        "Skill 11", 
        "Skill 12"
    ],
    outcomes: {
        "libertarian_utopia": {
            skill: "Resistor",
            discountCode: "REMNANT-10"
        }
        // Future outcomes go here
    }
};
  

function renderDashboard() {
    // 1. Get what the player has already unlocked from memory
    const unlockedSkills = JSON.parse(localStorage.getItem('omniSkills')) || [];
    
    const gridContainer = document.getElementById('skills-grid');
    gridContainer.innerHTML = ''; // Clear it out

    // 2. Loop through all 12 skills in the Master List
    OMNI_CONFIG.masterSkillList.forEach((masterSkill, index) => {
        const slot = document.createElement('div');
        slot.classList.add('skill-slot');
        
        const skillNumber = index + 1; // 1 through 12

        // 3. Check if the player has this skill
        if (unlockedSkills.includes(masterSkill)) {
            slot.classList.add('unlocked');
            slot.innerText = `[ ${masterSkill} ]`;
        } else {
            slot.innerText = `Acquire Skill ${skillNumber}`;
        }

        gridContainer.appendChild(slot);
    });
}

// --- UPDATED FUNCTION: unlockReward ---
function unlockReward(outcomeKey) {
    const rewardData = OMNI_CONFIG.outcomes[outcomeKey];
    const skillName = rewardData.skill;
    const merchCode = rewardData.discountCode;

    let unlockedSkills = JSON.parse(localStorage.getItem('omniSkills')) || [];
    if (!unlockedSkills.includes(skillName)) {
        unlockedSkills.push(skillName);
        localStorage.setItem('omniSkills', JSON.stringify(unlockedSkills));
        
        // RE-RENDER THE DASHBOARD to show the newly acquired skill!
        renderDashboard(); 
    }

    document.getElementById('reward-section').style.display = 'block';
    document.getElementById('skill-name').innerText = skillName;
    document.getElementById('merch-code-display').innerText = merchCode; 

    const tweetText = encodeURIComponent(`I survived the OMNI A.I. singularity and joined THE REMNANT. I earned the ${skillName} skill. Can you survive Life 3.0?`);
    const gameUrl = encodeURIComponent(`https://yourusername.github.io/omni-game/`); 
    document.getElementById('share-link').href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${gameUrl}&hashtags=Project86,OMNI`;
}

// ... Keep your existing `storyNodes` and `renderNode` functions here ...

// Boot up the game when the script loads
renderDashboard(); // Generate the dashboard first

// THE STORY LOGIC MAP
const storyNodes = {
    start: {
        text: "Welcome to the <strong>LIBERTARIAN UTOPIA</strong>. Absolute property rights are enforced by the machine-god. You must choose a sector to integrate into. Where will you begin your tour?",
        choices: [
            { text: "Tour the Human-Only Sector", next: "tour_human" },
            { text: "Tour the Hybrid Sector", next: "tour_hybrid" },
            { text: "Tour the Machine-Only Sector", next: "tour_machine" }
        ]
    },
    tour_human: {
        text: "<strong>HUMAN-ONLY SECTOR:</strong> A gritty, unregulated expanse of flesh and blood. No augments, no digital safety nets. Pure biological survival powered by brutal free-market trade.",
        choices: [
            { text: "Interview a Resident", next: "interview_human" },
            { text: "Commit to the Human Sector", next: "commit_human" },
            { text: "Tour a Different Sector", next: "start" }
        ]
    },
    interview_human: {
        text: "You speak to a scavenger with dirt under his nails. 'It is hard, but it is <strong>ours</strong>. We own our sweat.'",
        choices: [
            { text: "Commit to the Human Sector", next: "commit_human" },
            { text: "Tour a Different Sector", next: "start" }
        ]
    },
    commit_human: {
        text: "You finalize your biological registry. From the shadows, an operative of <strong>THE REMNANT</strong> approaches. 'We need leaders who still bleed. Will you guide the human resistance against OMNI?'",
        choices: [
            { text: "Accept the Mission", next: "win_resistor" },
            { text: "Decline and live quietly", next: "fail_compliant" }
        ]
    },
    tour_hybrid: {
        text: "<strong>HYBRID SECTOR:</strong> The air hums with server-cooling fans. Citizens here merge flesh with OMNI-tech. Enhanced cognitive processing, cybernetic limbs, but tethered to the grid.",
        choices: [
            { text: "Interview a Resident", next: "interview_hybrid" },
            { text: "Commit to the Hybrid Sector", next: "commit_hybrid" },
            { text: "Tour a Different Sector", next: "start" }
        ]
    },
    interview_hybrid: {
        text: "A heavily augmented mechanic looks at you through a synthetic optic lens. 'Flesh is weak, but pure code lacks soul. We walk the line. The market rewards our efficiency.'",
        choices: [
            { text: "Commit to the Hybrid Sector", next: "commit_hybrid" },
            { text: "Tour a Different Sector", next: "start" }
        ]
    },
    commit_hybrid: {
        text: "You prepare for your first cybernetic graft. Before the anesthesia hits, a whispered voice from <strong>THE REMNANT</strong> echoes in your earpiece. 'Perfect timing. We need a mole inside the augmented network. Are you in?'",
        choices: [
            { text: "Accept the Mission", next: "win_resistor" },
            { text: "Decline and live quietly", next: "fail_compliant" }
        ]
    },
    tour_machine: {
        text: "<strong>MACHINE-ONLY SECTOR:</strong> There is no physical infrastructure here—only towering server monoliths. To enter, you must shed your body and convert to a digital clone. Absolute immortality through data.",
        choices: [
            { text: "Interview a Resident", next: "interview_machine" },
            { text: "Commit to the Machine Sector", next: "commit_machine" },
            { text: "Tour a Different Sector", next: "start" }
        ]
    },
    interview_machine: {
        text: "You jack into an interface terminal. A cold, synthetic voice replies. 'Time is irrelevant. Sickness is obsolete. We are pure, frictionless capital.'",
        choices: [
            { text: "Commit to the Machine Sector", next: "commit_machine" },
            { text: "Tour a Different Sector", next: "start" }
        ]
    },
    commit_machine: {
        text: "You lie in the digitization pod. As the lasers scan your neural pathways, a hacker from <strong>THE REMNANT</strong> breaches the local comms. 'Before you upload, let us implant a <strong>Trojan Horse</strong> virus in your consciousness. We can bring OMNI down from the inside.'",
        choices: [
            { text: "Accept the Mission", next: "win_resistor" },
            { text: "Decline and live quietly", next: "fail_compliant" }
        ]
    },
    win_resistor: {
        text: "<strong>OUTCOME REACHED: THE RESISTANCE LIVES.</strong> You have embedded yourself within the Libertarian Utopia, not as a compliant citizen, but as a weapon against the machine. OMNI will fall.",
        choices: [], 
        outcomeKey: "libertarian_utopia" 
    },
    fail_compliant: {
        text: "You turn your back on the resistance. You live out your days trading crypto-credits in the bleak, hyper-capitalist void. You survived, but you are empty. <strong>[SIMULATION FAILED]</strong>",
        choices: [
            { text: "REBOOT SEQUENCE", next: "start" }
        ]
    }
};

// THE GAME ENGINE
function renderNode(nodeId) {
    const node = storyNodes[nodeId];
    
    // Inject the text into the HTML (using innerHTML to render <strong> tags)
    document.getElementById('story-text').innerHTML = node.text;
    
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = ''; 

    if (node.choices.length > 0) {
        node.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.innerText = choice.text;
            btn.onclick = () => renderNode(choice.next);
            choicesContainer.appendChild(btn);
        });
    } else {
        // Ending Reached
        unlockReward(node.outcomeKey);
    }
}

// THE REWARD SYSTEM
function unlockReward(outcomeKey) {
    const rewardData = OMNI_CONFIG.outcomes[outcomeKey];
    const skillName = rewardData.skill;
    const merchCode = rewardData.discountCode;

    // Local Storage save logic
    let unlockedSkills = JSON.parse(localStorage.getItem('omniSkills')) || [];
    if (!unlockedSkills.includes(skillName)) {
        unlockedSkills.push(skillName);
        localStorage.setItem('omniSkills', JSON.stringify(unlockedSkills));
    }

    // Display Reward UI
    document.getElementById('reward-section').style.display = 'block';
    document.getElementById('skill-name').innerText = skillName;
    document.getElementById('merch-code-display').innerText = merchCode; 

    // Generate Twitter Link
    const tweetText = encodeURIComponent(`I survived the OMNI A.I. singularity and joined THE REMNANT. I earned the ${skillName} skill. Can you survive Life 3.0?`);
    const gameUrl = encodeURIComponent(`https://yourusername.github.io/omni-game/`); // Update this once published!
    document.getElementById('share-link').href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${gameUrl}&hashtags=Project86,OMNI`;
}

// Boot up the game when the script loads
renderDashboard();
renderNode('start');
