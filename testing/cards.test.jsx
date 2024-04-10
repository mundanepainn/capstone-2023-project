import React from 'react';
import {fireEvent, render, screen, waitFor } from "@testing-library/react";
import Cards from '../src/components/Cards';
import {BrowserRouter as Router} from 'react-router-dom';
import { describe, it, expect, test, beforeEach } from 'vitest';

/**
* @vitest-environment jsdom
*/
describe("Rendering Cards component", () => {
    const { container } = render(<Router><Cards /></Router>);
    test("test the cards examples", () => {
        expect(screen.getByTestId('List'))
    })
});