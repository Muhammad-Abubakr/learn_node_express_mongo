/* ----------------------Unique------------------------ */

const persons = [
    {
        name: 'abubakr',
        age: 19,
        job: 'jobless',
    },
    {
        name: 'abubakr',
        age: 20,
        job: 'developer',
    },
    {
        name: 'abubakr',
        age: 21,
        job: 'retired',
    },
    {
        name: 'shadow lord',
        age: 21,
        job: 'beginning',
    },
]

console.log('not unique')
persons.map((person) => console.log(person.name))

var unique = new Set(persons.map((person) => person.name));

console.log('unique');
[ ...unique ].map((name) => console.log(name))

/* ----------------------------------------------------- */

/* ------------- Dynamic Keys for Objects -------------- */
const appState = 'loading';

const app = {
    [ appState ]: true,
}

console.log(app);

/* ----------------------------------------------------- */
