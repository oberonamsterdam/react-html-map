import * as React from 'react';
import HtmlMapper from '../src';
import renderer from 'react-test-renderer';

const TEST_HTML =
    '<p id="test-html">Af deel pomp soms tijd veel ad. En <strong>voorloopig</strong> uitgegeven en nu ad verkochten beschikken. Al zout al in over bord te. Voorschijn moeilijker wedijveren na op. Zelf kilo zoon wel dag ruwe gas. Grayah de op vloeit na is goeden. Cenis langs maken nemen al ad klein de te.<br />Bepaalde gebruikt de verrezen <em>gestoken schatten</em> en <strong>verbouwd</strong>. <br />Krachten nu eveneens na in op nadering britsche maleiers verbruik. </p>\\n<p>Dat geheel vleesch zonder been is, gebruikt men om daar Osse-worst van te maaken; en het vleesch van de schouwders met de twee platte bil stukken, met het vet van de broek gebruikt men tot rolpens in plaats van ander vet.</p>\\n<ul><li>Dit is een feest</li><li>Morgen komt de melkboer</li></ul><h3>Al zout al in over bord te.</h3>\\n<p>Witheid meestal noemden met zee aandeel gezocht valorem heb. Holen moest steek zoo mei zit. Slechts zee dag bronnen gemengd weg behoeft doelang der. Al blijft midden op om na daarin. Dien werk van eind vaak zal per doel iets gif. Tembun wat groote een enkele.</p>\\n<h3>Lauriergracht No 37</h3>\\n<p>Ik ben makelaar in koffi, en woon op de Lauriergracht No 37. Het is mijn gewoonte niet, romans te schrijven, of zulke dingen, en het heeft dan ook lang geduurd, voor ik er toe overging een paar riem papier extra te bestellen, en het werk aan te vangen, dat gij, lieve lezer, zoâven in de hand hebt genomen, en dat ge lezen moet als ge makelaar in koffie zijt, of als ge wat anders zijt.</p>\\n<h4>Busselinck &amp; Waterman</h4>\\n<p>Dat zijn ook makelaars in koffie, doch hun adres behoeft ge niet te weten. Ik pas er dus wel op, dat ik geen romans schrijf, of andere valse opgaven doe. Ik heb dan ook altijd opgemerkt dat mensen die zich met zoiets inlaten, gewoonlijk slecht wegkomen. Ik ben drieënveertig jaar oud, bezoek sedert twintig jaren de beurs, en kan dus voor de dag treden, als men iemand roept die ondervinding heeft. Ik heb al wat huizen zien vallen!</p>';

describe('it', () => {
    it('renders whitelisted components', () => {
        const tree = renderer
            .create(
                <HtmlMapper html={TEST_HTML}>
                    {{
                        h3: null,
                        p: null,
                    }}
                </HtmlMapper>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders all non-whitelisted components with acceptUnknown enabled', () => {
        const tree = renderer
            .create(
                <HtmlMapper html={TEST_HTML} acceptUnknown>
                    {{}}
                </HtmlMapper>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders custom components', () => {
        const tree = renderer
            .create(
                <HtmlMapper html={TEST_HTML}>
                    {{
                        p: ({ id, children }) => (
                            // a different html tag, and a attribute mapped to a different attribute.
                            <h6 className={id}>{children}</h6>
                        ),
                    }}
                </HtmlMapper>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
