'use strict';

function initializeAccordion(accordionElem) {

    //when section is clicked
    function handleAccordionSection(event) {
        showClickedAccorSection(event.currentTarget);
    }

    function showClickedAccorSection(accSection) {
        //Hiding the previous active section and making the clicked section active
        var expandedSection = accordionElem.querySelector('.active');
        if (expandedSection) {
            expandedSection.classList.remove('active');
        }

        accSection.classList.add('active');
    }

    //Getting all the accordion section and attaching event listeners to each of them
    var allAccordionSections = accordionElem.querySelectorAll('.acc-section');
    for (var i = 0, len = allAccordionSections.length; i < len; i++) {
        allAccordionSections[i].addEventListener('click', handleAccordionSection);
    }

    showClickedAccorSection(allAccordionSections[0]);
}

initializeAccordion(document.getElementById('accordion'));