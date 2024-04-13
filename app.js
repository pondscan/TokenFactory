const contractABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"name":"createToken","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = '0x1EDA825307D96CEBaB8e26353a9295EFfa3ea16a';

window.addEventListener('load', function() {
    if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const connectButton = document.getElementById('connectButton');
        const deployButton = document.getElementById('deployButton');
        const tokenName = document.getElementById('tokenName');
        const tokenSymbol = document.getElementById('tokenSymbol');
        const tokenSupply = document.getElementById('tokenSupply');
        const networkDisplay = document.getElementById('networkDisplay');
        const addressDisplay = document.getElementById('addressDisplay');

        connectButton.addEventListener('click', async () => {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const account = accounts[0];
                addressDisplay.textContent = `Address: ${account}`;

                const networkId = await web3.eth.net.getId();
                networkDisplay.textContent = `Network: ${networkId}`;

                if (networkId === 6969696969) {
                    tokenName.disabled = false;
                    tokenSymbol.disabled = false;
                    tokenSupply.disabled = false;
                    deployButton.disabled = false;
                } else {
                    alert("You are not connected to the Magma Testnet. Please switch networks in your wallet.");
                }
            } catch (error) {
                console.error("Error connecting to MetaMask", error);
            }
        });

        deployButton.addEventListener('click', async () => {
            const name = tokenName.value;
            const symbol = tokenSymbol.value;
            const supply = tokenSupply.value;
            try {
                const accounts = await web3.eth.getAccounts();
                await contract.methods.createToken(name, symbol, supply).send({ from: accounts[0] })
                alert("Token deployed successfully!");
            } catch (error) {
                console.error("Error deploying token", error);
                alert("Failed to deploy token: " + error.message);
            }
        });
    } else {
        console.log('MetaMask is not installed. Please consider installing it to interact with this app.');
    }
});
