import React, { useState, useEffect } from "react";
import "./index.css";

const FundingTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [fundingData, setFundingData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const rowsPerPage = 5;

    useEffect(() => {
        const fetchFundingData = async () => {
            setError(null);
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
                );
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch data: ${response.status}`
                    );
                }
                const data = await response.json();
                setFundingData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFundingData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getListOfCompaniesForCurrentPage = () => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return fundingData.slice(startIndex, endIndex);
    };

    const renderContent = () => {
        if (isLoading) return <p>Loading table...</p>;

        if (error)
            return (
                <p className="error">{error || "Oops something went wrong"}</p>
            );

        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Percentage Funded</th>
                            <th>Amount Pledged</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getListOfCompaniesForCurrentPage().map((company, index) => (
                            <tr key={company["s.no"] + index}>
                                <td>{company["s.no"]}</td>
                                <td>{company["percentage.funded"]}%</td>
                                <td>${company["amt.pledged"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>

                    <span className="page-number">Page {currentPage}</span>

                    <button
                        disabled={
                            currentPage ===
                            Math.ceil(fundingData.length / rowsPerPage)
                        }
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </>
        );
    };

    return <div className="funding-table">{renderContent()}</div>;
};

export default FundingTable;
