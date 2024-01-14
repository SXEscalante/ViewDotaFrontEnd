import { useEffect, useState } from "react";
import AccountInfoDisplay from "../../components/AccountInfoDisplay/AccountInfoDisplay";
import heroes from "../../data/DotaHeroes"


import axios from "axios";
import { useParams } from "react-router-dom";

const FriendsAccountPage = ({}) => {
    const [timePeriod, setTimePeriod] = useState(Math.round(Date.now()/1000));
    const [accountInfo, setAccountInfo] = useState({});
    const [filteredAccountInfo, setFilteredAccountInfo] = useState([]);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState(-1);

    const [damage, setDamage] = useState(0);
    const [kills, setKills] = useState(0);
    const [towerDamage, setTowerDamage] = useState(0);
    const [denies, setDenies] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [healing, setHealing] = useState(0);
    const [lastHits, setLastHits] = useState(0);
    const [assists, setAssists] = useState(0);
    const [netWorth, setNetWorth] = useState(0);
    const [mostPlayedHeroId, setMostPlayedHeroId] = useState(-1);
    const [mostPlayedHero, setMostPlayedHero] = useState({});

    const { friendId } = useParams();

    const handleAccountInfo = async () => {
        
        try {
            const responce = await axios.get(`https://localhost:5001/api/SteamAPI/account/${friendId}`)
            if(responce.status === 200){
                setAccountInfo(responce.data)
            }
        } catch (error) {
            console.log("Error getting account info", error)
        }
    }

    const handleMatchInfo = async (matchId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const responce = await axios.get(`https://localhost:5001/api/SteamAPI/match/${matchId}`)
                if(responce.status === 200){
                    const heroId = responce.data.result.players.filter((player) => player.account_id == friendId)[0].hero_id
                    updateAccountInfo(responce.data.result.players.filter((player) => player.account_id == friendId), heroId)
                    resolve(heroId);
                }
            } catch (error) {
                console.log("Error getting match info", error)
                reject();
            }
        })
    }

    const updateAccountInfo = (matchInfo) => {
        setDamage(prevDamage => prevDamage + matchInfo[0].hero_damage)
        setKills(prevKills => prevKills + matchInfo[0].kills)
        setTowerDamage(prevTowerDamage => prevTowerDamage + matchInfo[0].tower_damage)
        setDenies(prevDenies => prevDenies + matchInfo[0].denies)
        setDeaths(prevDeaths => prevDeaths + matchInfo[0].deaths)
        setHealing(prevHealing => prevHealing + matchInfo[0].hero_healing)
        setLastHits(prevLastHits => prevLastHits + matchInfo[0].last_hits)
        setAssists(prevAssists => prevAssists + matchInfo[0].assists)
        setNetWorth(prevNetWorth => prevNetWorth + matchInfo[0].net_worth)
    }

    const filterAccountInfo = (matches) => {
        if(matches != null){
            const result = matches.filter((match) => match.start_time >= timePeriod)
            setFilteredAccountInfo(result)
        }
    }


    const resetAccountInfo = () => {
        setDamage(0)
        setKills(0)
        setTowerDamage(0)
        setDenies(0)
        setDeaths(0)
        setHealing(0)
        setLastHits(0)
        setAssists(0)
        setNetWorth(0)
        setMostPlayedHero(-1)
    }
    
    const findMostPlayedHero = (heroIds) => {
        console.log("heroIds", heroIds)
        var matchCount = {};
        let topPlayedHero = heroIds[0], maxCount = 0;
        for (let i = 0; i < heroIds.length; i++ ){
            let hero = heroIds[i]

            if(matchCount[hero] == null){
                matchCount[hero] = 1;
            }
            else {
                matchCount[hero]++;
            }

            if (matchCount[hero] > maxCount){
                topPlayedHero = hero;
                maxCount = matchCount[hero]
            }
        }
        console.log("hero", topPlayedHero)
        setMostPlayedHeroId(topPlayedHero)
    }

    useEffect(() => {
        handleAccountInfo()

    }, []);

    useEffect(() => {
        if(accountInfo != null && accountInfo.result != null && accountInfo.result.matches != null){
            filterAccountInfo(accountInfo.result.matches)
            resetAccountInfo()
        }
    }, [timePeriod]);

    useEffect(() => {
        if(filteredAccountInfo != null){
            const promises = filteredAccountInfo.map(match => handleMatchInfo(match.match_id));
            Promise.all(promises).then((heroIds) => {
                findMostPlayedHero(heroIds);
            }).catch((error) => {
                console.log("Error filtering match info:", error)
            })
        }
    }, [filteredAccountInfo]);

    useEffect(() => {

        const mostPlayedHeroObj = heroes.filter((hero) => hero.heroId == mostPlayedHeroId)
        setMostPlayedHero(mostPlayedHeroObj[0])

    }, [mostPlayedHeroId]);

    return ( 
        <div className="account-page">
            <div>
                <h1 className="account-name" >{}</h1>
                <div className="account-info">
                    <div className="account-info-header">
                        <h3 className="header-box">Games: {filteredAccountInfo.length}</h3>
                        <div className="header-box time-selector">
                            <h3>Time Period:</h3>
                            <button className={selectedTimeFrame === 1 ? "pressed" : ""} onClick={() => {
                                setTimePeriod(Math.round(Date.now()/1000) - 86400);
                                setSelectedTimeFrame(1)
                            }}>1 Day</button>
                            <button className={selectedTimeFrame === 2 ? "pressed" : ""} onClick={() => {
                                setTimePeriod(Math.round(Date.now()/1000) - 604800);
                                setSelectedTimeFrame(2)
                            }}>1 Week</button>
                            <button className={selectedTimeFrame === 3 ? "pressed" : ""} onClick={() => {
                                setTimePeriod(Math.round(Date.now()/1000) - 2592000)
                                setSelectedTimeFrame(3)
                            }}>1 Month</button>
                        </div>
                    </div>
                    <div className="account-info-body">
                        <AccountInfoDisplay label={"Total Damage Done"} value={damage}/>
                        <AccountInfoDisplay label={"Total Kills"} value={kills}/>
                        <AccountInfoDisplay label={"Total Tower Damage"} value={towerDamage}/>
                        <AccountInfoDisplay label={"Total Denies"} value={denies}/>
                        <AccountInfoDisplay label={"Total Deaths"} value={deaths}/>
                        <AccountInfoDisplay label={"Total Healing"} value={healing}/>
                        <AccountInfoDisplay label={"Total Last Hits"} value={lastHits}/>
                        <AccountInfoDisplay label={"Total Assists"} value={assists}/> 
                        <AccountInfoDisplay label={"Total Net Worth"} value={netWorth}/>
                    </div>
                </div>
            </div>
            <div className="hero-box">
                {mostPlayedHero &&
                    <div className="top-hero">
                    <img className="top-hero-img" src={mostPlayedHero.img} alt="hoody" />
                    <p className="top-hero-name">{mostPlayedHero.name}</p>
                    </div>
                }
            </div>
        </div>
    );
}
 
export default FriendsAccountPage;