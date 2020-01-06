import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lotto from './lotto';

const App = () => {
	const [ manager, setManager ] = useState('');
	const [ players, setPlayers ] = useState([]);
	const [ balance, setBalance ] = useState('');
	const [ amount, setAmount ] = useState(0.1);
	const [ trans, setTrans ] = useState('');

	useEffect(() => {
		async function fetchManager() {
			const [ resManager, resPlayers, resBalance ] = await Promise.all([
				lotto.methods.manager().call(),
				lotto.methods.getPlayers().call(),
				web3.eth.getBalance(lotto.options.address)
			]);
			setManager(resManager);
			setPlayers(resPlayers);
			setBalance(resBalance);
		}
		fetchManager();
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		const accs = await web3.eth.getAccounts();

		setTrans('Waiting on transaction success...');

		await lotto.methods.roll().send({
			from: accs[0],
			value: web3.utils.toWei(amount.toString(), 'ether')
		});

		setTrans('You have entered the pool!');
		const [ resPlayers, resBalance ] = await Promise.all([
			lotto.methods.getPlayers().call(),
			web3.eth.getBalance(lotto.options.address)
		]);
		setPlayers(resPlayers);
		setBalance(resBalance);
	};

	const onWinner = async () => {
		const accs = await web3.eth.getAccounts();

		setTrans('Beep Boop, calculating the winner..');

		await lotto.methods.pickWinner().send({
			from: accs[0]
		});

		const winner = await lotto.methods.winner().call();

		setTrans(`A winner has been picked!... the winner is: ${winner}`);
		const [ resPlayers, resBalance ] = await Promise.all([
			lotto.methods.getPlayers().call(),
			web3.eth.getBalance(lotto.options.address)
		]);
		setPlayers(resPlayers);
		setBalance(resBalance);
	};

	return (
		<div className="App">
			<header className="App-header">
				<div>
					<h2>Lotto Contract</h2>
					<h3>Managed by {manager}</h3>
				</div>
				<div>
					<h6>Currently {players.length} players</h6>
					<h6>Current pool of {web3.utils.fromWei(balance, 'ether')} ether</h6>
				</div>
			</header>
			<hr />
			<form onSubmit={onSubmit}>
				<h3>Do you feel lucky, punk?</h3>
				<h6 style={{ color: 'red' }}>{trans}</h6>
				<label>Amount of Ether to bet</label>
				<div>
					<input type="number" value={amount} min={0.1} onChange={(event) => setAmount(event.target.value)} />
				</div>
				<button type="submit">Enter now</button>
			</form>
			<hr />
			<h3>Click here to pick a winner</h3>
			<button onClick={onWinner}>Pick a winner</button>
		</div>
	);
};

export default App;
