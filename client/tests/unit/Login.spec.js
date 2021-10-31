import {
    mount
} from '@vue/test-utils';
import Login from '@/views/Login.vue';

describe('Login.vue', () => {
    test('snapshot', () => {
        const wrapper = mount(Login);
        expect(wrapper).toMatchSnapshot();
    })
})