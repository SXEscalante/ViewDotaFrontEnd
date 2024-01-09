import MatchRow from "../../components/MatchRow/MatchRow";

import "./MatchHistoryPage.css"

const MatchHistoryPage = ({}) => {
    return ( 
        <div className="match-history">
            <table>
                <thead>
                    <tr>
                        <div className="front">
                            <th>Result</th>
                            <th>K/D/A</th>
                            <th>KDA</th>
                            <th>Damage</th>
                            <th>Healing</th>
                            <th>Net Worth</th>
                            <th>Duration</th>
                        </div>
                        <th className="friends">Friends</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    );
}
 
export default MatchHistoryPage;