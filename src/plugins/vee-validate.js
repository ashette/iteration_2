import { extend, localize } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru.json';
import * as rules from 'vee-validate/dist/rules';

localize("ru", ru);

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});