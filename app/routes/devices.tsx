import { Container } from '@mantine/core';
import { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
    return {
        title: '/devices - mmatt.net',
        description: 'mmatt.net/projects - specs and stuff.',
    };
};

export default function DevicesPage() {
    return (
        <Container>
            <h1>/devices</h1>

            <h2>main pc</h2>
            <p>
                <ul>
                    <li>CPU: Intel i9-9900K</li>
                    <li>
                        RAM: 32GB 3200 MHz <a href="https://www.amazon.com/dp/B081XWLQKS">(Corsair Vengence Pro)</a>
                    </li>
                    <li>GPU: RTX 2070</li>
                    <li>OS: Pop!_OS 22.04 LTS</li>
                    <li>Storage:</li>
                    <ul>
                        <li>NVME: WD_BLACK: 1TB</li>
                        <li>SSD: Random generic one from how the computer came: 1TB</li>
                    </ul>
                    <li>
                        Keyboard: <a href="https://www.pcgamingrace.com/products/gmmk-tkl-tenkeyless-brown-switch">Glorious GMMK TKL: Gateron Reds</a>
                    </li>
                    <li>Mouse: Finalmouse Starlight-12 (Gold) - 400 DPI</li>
                    <li>
                        (Out of date) Benchmark: <a href="https://www.userbenchmark.com/UserRun/49470833">Click Here</a>
                    </li>
                    <li>
                        (Out of date) PC Part Picker: <a href="https://pcpartpicker.com/list/wsNGK4">Click Here</a>
                    </li>
                </ul>
            </p>

            <h2>main laptop</h2>
            <p>
                <ul>
                    <li>Model: Apple Macbook Air (Late 2020) - M1</li>
                    <li>CPU: Apple M1</li>
                    <li>GPU: 8 Core GPU from M1</li>
                    <li>RAM: 16GB</li>
                    <li>Storage:</li>
                    <ul>
                        <li>SSD(?): 500GB</li>
                    </ul>
                    <li>OS: macOS Monterey (12.4)</li>
                </ul>
            </p>

            <h2>streaming laptop</h2>
            <p>
                <ul>
                    <li>CPU: Intel i7-7700HQ</li>
                    <li>RAM: 8GB Kingston 2400MHz</li>
                    <li>GPU: GTX 1050 (4GB)</li>
                    <li>Storage:</li>
                    <ul>
                        <li>HDD: 1TB</li>
                    </ul>
                    <li>OS: Windows 11</li>
                    <li>Capture Card: Elgato HD60s</li>
                    <li>
                        Benchmark: <a href="https://www.userbenchmark.com/UserRun/21437525">Click Here</a>
                    </li>
                </ul>
            </p>
        </Container>
    );
}
