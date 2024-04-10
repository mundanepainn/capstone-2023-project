import React from 'react';
import {fireEvent, render, screen, waitFor } from "@testing-library/react";
import Signin from '../src/pages/SignIn';
import {BrowserRouter as Router} from 'react-router-dom';
import { describe, it, expect, test, beforeEach } from 'vitest';

/**
* @vitest-environment jsdom
*/

describe('Rendering the landing page', () => {
    const {container} = render(<Router><Signin /></Router>);
    test('expected that the form is shown', () => {
        const signform = screen.findByRole('form')
        expect(signform).toBeDefined()
    })

    test('tests to see if the expected text components are there', () => {
        expect(screen.getByText('E-mail'))
        expect(screen.getByText('Password'))
    })

    test('tests to see if the expected buttons exist', () => {
        const button1 = container.getElementsByClassName('signin-btn')
        const button2 = container.getElementsByClassName('link-btn')
        expect(button1).toBeDefined()
        expect(button2).toBeDefined()
    })
    test('expected to show input boxes', () => {
        expect(screen.getByLabelText('E-mail'))
        expect(screen.getByLabelText('Password'))
    })

});