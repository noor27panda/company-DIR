const companyTransformer = (company) => {
    if (company?.dataValues?.password) {
        delete company.dataValues.password
    }
    return company
}
const companiesTransformer = (companies) => {
    return companies.map((company) => companyTransformer(company))
}
module.exports = {
    companyTransformer,
    companiesTransformer
}