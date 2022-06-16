import path from 'path';
import initStoryshots from '@storybook/addon-storyshots';

initStoryshots({
    framework: 'react', //👈 Manually specify the project's framework
    configPath: path.join(__dirname, '.storybook'),
    integrityOptions: { cwd: path.join(__dirname, 'src', 'stories') },
    // Other configurations
});