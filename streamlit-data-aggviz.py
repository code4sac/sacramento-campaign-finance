#GO TO POWERSHELL AND RUN COMMAND:  streamlit run streamlit-data-aggviz.py

import streamlit as st
import os
import pandas as pd


st.set_page_config(layout="wide")

st.title("Sacramento Campaign Finance 2014 - 2023")

folder_path = 'data/'

# Function to read all JSON files from a folder into a single DataFrame
def read_jsons_from_folder(folder_path):
    all_files = [f for f in os.listdir(folder_path) if f.endswith('.json')]
    df_list = []
    
    for file in all_files:
        file_path = os.path.join(folder_path, file)
        df = pd.read_json(file_path)
        df_list.append(df)
    
    # Concatenate all DataFrames into a single DataFrame
    combined_df = pd.concat(df_list, ignore_index=True)
    return combined_df

combined_df = read_jsons_from_folder(folder_path)

# Create 'Campaigns-allYears' column
combined_df['Campaigns-allYears'] = combined_df['filerName'].str[:-5] \
    .where(combined_df['filerName'].str[-4:].str.isnumeric(), combined_df['filerName'])

# Replace 'City Council' label for 2023 data with general "Sacramento City" label used for all previous years
combined_df['agencyName'] = combined_df['agencyName'].replace("City Council", "Sacramento City")

# Replace 'Board of Supervisors' label for 2023 data with general "Sacramento County" label used for all previous years
combined_df['agencyName'] = combined_df['agencyName'].replace("Board of Supervisors", "Sacramento County")

# convert 'year' column to string
combined_df['year'] = combined_df['year'].astype(str)

original_df = combined_df[['agencyName', 'filerName', 'Campaigns-allYears', 'amount', 'year', 'date', 'contributorLastName', 'contributorFirstName', 'contributorCity', 'contributorZip', 'contributorOccupation', 'contributorEmployer','committeeType','transactionId']]

# Create a dictionary to map old column names to new column names
column_mapping = {'agencyName':'Entity',
                  'filerName':'Campaign/PAC',
                  'Campaigns-allYears':'Campaigns/PACs-all years',
                  'amount':'Contribution',
                  'year':'Year',
                  'date':'Date',
                  'contributorLastName':'Contributor Last Name',
                  'contributorFirstName':'Contributor First Name',
                  'contributorCity':'Contributor City',
                  'contributorZip':'Contributor Zip',
                  'contributorOccupation':'Contributor Occupation',
                  'contributorEmployer':'Contributor Employer',
                  'committeeType':'Committee Type',
                  'transactionId':'Transaction ID #',
                 }

# Rename the columns using the rename method
original_df.rename(columns=column_mapping, inplace=True)


filters = {'Entity': 'All',
      'Campaign/PAC': 'All',
      'Campaigns/PACs-all years': 'All',
      'Contribution': 'All',
      'Year': 'All',
      'Date': 'All',
      "Contributor Last Name": 'All',
      "Contributor First Name": 'All',
      'Contributor City': 'All',
      'Contributor Zip': 'All',
      'Contributor Occupation': 'All',
      'Contributor Employer': 'All',
      'Committee Type': 'All',
      'Transaction ID #': 'All',
                 }

# Create a function to get the unique values for a column based on active filters
def get_filtered_values(column, active_filters):
    df = original_df.copy()
    for key, value in active_filters.items():
        if key != column and value != 'All':
            df = df[df[key] == (int(value) if key == 'year' else value)]
    return ['All'] + sorted(list(map(str, df[column].unique())))

# Create the filters
for column in filters.keys():
    filters[column] = st.sidebar.selectbox(f"Select {column}", options=get_filtered_values(column, filters))

# Filter the main dataframe
filtered_df = original_df.copy()
for key, value in filters.items():
    if value != 'All':
        filtered_df = filtered_df[filtered_df[key] == (int(value) if key == 'year' else value)]
        
# Display aggregate total of 'amount'
aggregate_total = filtered_df['Contribution'].sum()
st.write(f"Aggregate Total Amount: ${aggregate_total:,.2f}")
st.write(filtered_df)

# Bar Chart: Amount by user-selected category
categories = ['Entity',
      'Campaign/PAC',
      'Campaigns/PACs-all years',
      'Contribution',
      'Year',
      'Date',
      "Contributor Last Name",
      "Contributor First Name",
      'Contributor City',
      'Contributor Zip',
      'Contributor Occupation',
      'Contributor Employer',
      'Committee Type',
      'Transaction ID #']
selected_category = st.selectbox("Select a category for the bar chart", categories)
amount_by_category = filtered_df.groupby(selected_category)['Contribution'].sum()
st.bar_chart(amount_by_category)

# Line Chart: Aggregated amount by year
amount_by_year = filtered_df.groupby('Year')['Contribution'].sum()
st.line_chart(amount_by_year)